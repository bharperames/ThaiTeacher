// Spaced repetition shared by the flashcard decks (simplified SM-2).
// Intervals are stored in minutes. New/lapsed cards go through short learning
// steps (1 min, 10 min) before graduating to day-scale review intervals.
const SRS = (() => {
  const MIN = 1, DAY = 1440;

  function freshCard() { return { reps: 0, ease: 2.5, interval: 0, due: null, lapses: 0 }; }

  function schedule(card, rating) {
    const c = { ...card };
    const learning = c.reps === 0;
    if (rating === "again") {
      if (!learning) c.lapses++;
      c.reps = 0;
      c.interval = 1 * MIN;
      c.ease = Math.max(1.3, c.ease - 0.2);
    } else if (rating === "hard") {
      c.interval = learning ? 5 * MIN : Math.max(DAY, c.interval * 1.2);
      c.ease = Math.max(1.3, c.ease - 0.15);
    } else if (rating === "good") {
      if (learning && c.interval < 10 * MIN) {
        c.interval = 10 * MIN;              // second learning step
      } else if (learning) {
        c.interval = DAY; c.reps = 1;       // graduate
      } else {
        c.interval = Math.max(DAY, c.interval * c.ease); c.reps++;
      }
    } else if (rating === "easy") {
      c.interval = learning ? 4 * DAY : Math.max(DAY, c.interval * c.ease * 1.3);
      c.ease += 0.15;
      c.reps++;
    }
    c.due = Date.now() + c.interval * 60000;
    return c;
  }

  function fmtInterval(min) {
    if (min < 60) return `${Math.round(min)}m`;
    if (min < DAY) return `${Math.round(min / 60)}h`;
    const d = min / DAY;
    if (d < 30) return `${Math.round(d)}d`;
    if (d < 365) return `${(d / 30).toFixed(1)}mo`;
    return `${(d / 365).toFixed(1)}y`;
  }

  function status(c) {
    if (c.due === null) return "new";
    return c.reps === 0 ? "learning" : "review";
  }

  function today() { return new Date().toDateString(); }

  // A deck of cards saved in localStorage under `key`. Cards are saved by id,
  // so adding cards to a deck later keeps everyone's progress. The page talks
  // to the deck by index into `ids`. `defaults` are extra saved settings.
  class Deck {
    constructor(key, ids, { newPerDay = 5, defaults = {} } = {}) {
      this.key = key;
      this.ids = ids;
      this.newPerDay = newPerDay;
      this.defaults = defaults;
      this.extraNew = 0;      // "learn more" bonus for this session
      this.state = this.load();
    }

    load() {
      let s = null;
      try { s = JSON.parse(localStorage.getItem(this.key)); } catch (e) {}
      s = { ...this.defaults, newDay: today(), newToday: 0, ...(s || {}) };
      // Older saves kept cards as an array in deck order.
      if (Array.isArray(s.cards)) s.cards = Object.fromEntries(s.cards.map((c, i) => [this.ids[i], c]));
      const saved = s.cards || {};
      s.cards = Object.fromEntries(this.ids.map(id => [id, saved[id] || freshCard()]));
      return s;
    }

    save() {
      try { localStorage.setItem(this.key, JSON.stringify(this.state)); } catch (e) {}
    }

    card(i) { return this.state.cards[this.ids[i]]; }
    all() { return this.ids.map((id, i) => ({ c: this.state.cards[id], i })); }

    rollDay() {
      if (this.state.newDay !== today()) { this.state.newDay = today(); this.state.newToday = 0; this.save(); }
    }

    newLeft() { return Math.max(0, this.newPerDay + this.extraNew - this.state.newToday); }

    // Index of the next card to show, or null when nothing is due.
    next(ahead = false) {
      this.rollDay();
      const now = Date.now();
      const seen = this.all().filter(x => x.c.due !== null);
      const due = seen.filter(x => x.c.due <= now).sort((a, b) => a.c.due - b.c.due);
      if (due.length) return due[0].i;
      if (this.newLeft() > 0) {
        const n = this.all().find(x => x.c.due === null);
        if (n) return n.i;
      }
      if (ahead && seen.length) return seen.sort((a, b) => a.c.due - b.c.due)[0].i;
      return null;
    }

    rate(i, rating) {
      if (this.card(i).due === null) this.state.newToday++;
      this.state.cards[this.ids[i]] = schedule(this.card(i), rating);
      this.save();
    }

    counts() {
      const now = Date.now(), cs = this.all().map(x => x.c);
      return {
        new: Math.min(this.newLeft(), cs.filter(c => c.due === null).length),
        learning: cs.filter(c => c.due !== null && c.reps === 0 && c.due <= now).length,
        due: cs.filter(c => c.due !== null && c.reps > 0 && c.due <= now).length,
        unseen: cs.filter(c => c.due === null).length,
        nextDue: cs.filter(c => c.due !== null).map(c => c.due).sort((a, b) => a - b)[0] ?? null,
      };
    }

    reset() {
      const keep = Object.fromEntries(Object.keys(this.defaults).map(k => [k, this.state[k]]));
      this.state = { ...keep, newDay: today(), newToday: 0,
        cards: Object.fromEntries(this.ids.map(id => [id, freshCard()])) };
      this.extraNew = 0;
      this.save();
    }
  }

  return { Deck, schedule, fmtInterval, status };
})();
