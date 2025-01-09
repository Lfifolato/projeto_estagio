export function whereDynamic(whereDto: Record<string, any>) {
  const where: Record<string, any> = {};

  for (const [key, value] of Object.entries(whereDto)) {
    if (value !== undefined && value !== null && value !== '') {
      where[key] = value;
    }
  }

  const isEmptyWhere = Object.keys(where).length === 0;

  const full = isEmptyWhere ? true : false;

  return { where: where, full: full };
}
