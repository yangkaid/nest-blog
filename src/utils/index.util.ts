export function getPagination(total, pageSize, page) {
  const pages = Math.ceil(total / pageSize);
  return {
    total: Number(total),
    page: Number(page),
    pageSize: Number(pageSize),
    pages: Number(pages),
  };
}
