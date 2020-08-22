const test = require('ava');
const Ticket = require('../../src/classes/tickets/ticket');

test('ticket methods', (t) => {
  const ticket = new Ticket();
  t.is(ticket.getDuration(), 0);
  t.is(ticket.calcFee(), 10);

  ticket.setDuration(5);

  t.is(ticket.getDuration(), 5);
  t.is(ticket.calcFee(), 40);

  ticket.setDuration(1);

  t.is(ticket.getDuration(), 1);
  t.is(ticket.calcFee(), 10);
});

test('ticket with diff billing', (t) => {
  const ticket = new Ticket(8, 'some');
  t.is(ticket.getDuration(), 8);
  t.is(ticket.calcFee(), 0);
});
