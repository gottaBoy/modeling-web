export async function getJsonUrl(
  baseUrl: string,
  code: string | number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
  const res = await ibiz.net.axios({
    url: `${baseUrl}/${code}.json`,
  });
  return res.data;
}
