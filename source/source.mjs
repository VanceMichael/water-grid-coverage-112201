export async function source({url, frame, json}) {
  if (!url.pathname.startsWith('/readings/')) return false;
  const site = url.pathname.split('/').at(-1);
  if (!['east','west'].includes(site)) return json(404,{error:'未知调度区'});
  const from = Number(url.searchParams.get('from'));
  const to = Number(url.searchParams.get('to'));
  if (!Number.isInteger(from) || !Number.isInteger(to) || from >= to) return json(400,{error:'无效时间区间'});
  const coveredUntil = Math.min(from+frame.scan,to);
  return json(200,{site,from,coveredUntil,nextFrom:coveredUntil < to ? coveredUntil : null,
    readings:frame.records.filter(item => item.site === site && item.at >= from && item.at < coveredUntil)});
}
