import { readFile } from "node:fs/promises";
import path from "node:path";
import Script from "next/script";

export default async function Home() {
  const page = await readFile(path.join(process.cwd(), "app/page-content.html"), "utf8");
  return <>
    <div dangerouslySetInnerHTML={{ __html: page }} />
    <Script src="/site-effects.js" strategy="afterInteractive" />
  </>;
}
