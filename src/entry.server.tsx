import { renderToReadableStream } from 'react-dom/server';
import { ServerRouter } from 'react-router';
import type { EntryContext } from 'react-router';

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext,
) {
  const stream = await renderToReadableStream(
    <ServerRouter context={routerContext} url={request.url} />,
    { signal: request.signal },
  );

  responseHeaders.set('Content-Type', 'text/html');

  return new Response(stream, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}
