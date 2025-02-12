type serverRequestOptions = {
  method?: "GET" | "POST" | "DELETE" | "PUT";
  action?: { action: string; value: string };
  body?: any;
  last?: number;
  tags?: string[];
  error?: boolean;
};

const SERVER =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5001"
    : "https://api.yingxitech.com";

export default async function serverRequest(
  url: string,
  opt?: serverRequestOptions
) {
  try {
    const options: Record<string, any> = {
      method: opt?.method || "GET",
    };
    if (typeof opt?.last === "number")
      options["next"] = { revalidate: opt?.last };

    const headers: Record<string, string> = {};
    if (options.method !== "GET") {
      headers["content-type"] = "application/json";
      if (opt?.body && typeof opt.body !== "object")
        throw Error("body object misformat");
      else if (opt?.body) {
        options["body"] = JSON.stringify(opt.body);
      }
    }

    if (opt?.action) {
      const signRes = await serverRequest("/auth/getSign", {
        method: "POST",
        body: { action: "weixin", value: "notice" },
      });
      if (!signRes) throw Error("sign error");
      headers["x-sign"] = signRes.sign;
    }

    if (Object.keys.length > 0) options["headers"] = headers;
    if (opt?.tags && opt?.tags instanceof Array)
      options["next"] = options["next"]
        ? { ...options["next"], tags: opt.tags }
        : { tags: opt.tags };

    const uri = new URL(encodeURI(SERVER + url));
    uri.searchParams.set("sid", "yingxitech");
    const res = await fetch(uri.toString(), options);
    if (res.status !== 200) {
      throw Error(await res.text());
    }
    return res.json();
  } catch (e: any) {
    console.log(e.toString());
    return opt && opt.error ? { error: e.toString() } : null;
  }
}
