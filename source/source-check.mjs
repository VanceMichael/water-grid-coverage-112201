export async function exercise({move,data,assert}) {
  const first = await data('/readings/east?from=39&to=57');
  assert.equal(first.nextFrom,43);
  assert.ok(first.readings.every(row => row.at < 43));
  assert.equal((await data('/switches'))[0].confirmed,false);
  await move(1);
  assert.deepEqual((await data('/switches')).map(row=>row.pipe),['bc','ed']);
  const west = await data('/readings/west?from=48&to=56');
  assert.ok(west.readings.some(row=>row.point==='q'));
  assert.equal(west.readings.find(row=>row.at===52).valid,false);
  await move(2);
  assert.equal((await data('/switches')).filter(row=>row.pipe==='bc').length,2);
  const field = (await data('/field-returns'))[0];
  assert.equal(field.order,'D41');
  assert.deepEqual(field.interval,[49,54]);
}
