import { getRequestConfig } from "next-intl/server";
import { routing } from "./route";
import { notFound } from "next/navigation";

export default getRequestConfig(async ({ locale }) => {
  if (!routing.locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`../../public/locales/${locale}.json`)).default,
  };
});
