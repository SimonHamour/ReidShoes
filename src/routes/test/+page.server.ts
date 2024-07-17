import type { PageServerLoad } from "../$types";
import * as Database from '$lib/server/Database';
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ cookies }) => {
	const data: Map<string, string> = await Database.dataProdukModal("1");
    return { data }
};