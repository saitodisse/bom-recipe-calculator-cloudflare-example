/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import {
	IProduct,
	MaterialsTreeBuilder,
} from "@saitodisse/bom-recipe-calculator";

// Define your products with their recipes
const products: Record<string, IProduct> = {
	"flour": {
		id: "flour",
		name: "Wheat Flour",
		category: "m",
		unit: "KG",
		weight: 1,
		purchaseQuoteValue: 2.5,
		recipe: null,
	},
	"water": {
		id: "water",
		name: "Water",
		category: "m",
		unit: "L",
		weight: 1,
		recipe: null,
	},
	"dough": {
		id: "dough",
		name: "Basic Dough",
		category: "s",
		unit: "KG",
		weight: 2,
		purchaseQuoteValue: null,
		recipe: [
			{ id: "flour", quantity: 1 },
			{ id: "water", quantity: 0.5 },
		],
	},
};

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const url = new URL(request.url);
		const quantity = url.searchParams.get("quantity");
		const builder = new MaterialsTreeBuilder({
			productsList: products,
			productCode: "dough",
			initialQuantity: quantity ? Number(quantity) : 1,
		});

		const tree = builder.build();

		return new Response(JSON.stringify(tree, null, 2), {
			headers: { "content-type": "application/json" },
		});
	},
} satisfies ExportedHandler<Env>;
