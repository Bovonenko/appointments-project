import { useState, useCallback } from "react";

export type LoadingStatusOptions = "idle" | "loading" | "error";
type HTTPRequestMethods = "GET" | "POST" | "PATCH" | "DELETE";
interface HTTPHeaders {
	[key: string]: string;
}
// type HTTPHeaders = Record<string, string>

interface RequestConfig {
	url: string;
	method?: HTTPRequestMethods;
	body?: string | null;
	headers?: HTTPHeaders;
}

export const useHttp = () => {
	const [loadingStatus, setLoadingStatus] =
		useState<LoadingStatusOptions>("idle");

	const request = useCallback(
		async ({
			url,
			method = "GET",
			body = null,
			headers = { "Content-Type": "application/json" },
		}: RequestConfig) => {
			setLoadingStatus("loading");
			try {
				const response = await fetch(url, {
					method,
					body,
					headers,
				});

				if (!response.ok) {
					throw new Error(
						`Could not fetch ${url}, status:${response.status}`
					);
				}

				const data = await response.json();
				setLoadingStatus("idle");
				return data;
			} catch (e) {
				setLoadingStatus("error");
				throw e;
			}
		},
		[]
	);

	return { loadingStatus, request };
};
