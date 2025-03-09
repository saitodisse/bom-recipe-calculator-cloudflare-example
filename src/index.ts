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

import { ProductMap, ProductCategory, ProductUnit, createMaterialsTree } from "@saitodisse/bom-recipe-calculator";

const PRODUCTS_MAP: ProductMap = {
	"cheeseburger": {
	  id: "cheeseburger",
	  name: "Cheeseburger",
	  category: ProductCategory.p.id,
	  unit: ProductUnit.UN.id,
	  weight: 0.180,
	  purchaseQuoteValue: 12.90,
	  notes: "",
	  recipe: [
		{ id: "bun", quantity: 1 },
		{ id: "patty", quantity: 1 },
		{ id: "cheese", quantity: 1 },
	  ],
	},
	"bun": {
	  id: "bun",
	  name: "Burger Bun",
	  category: ProductCategory.m.id,
	  unit: ProductUnit.UN.id,
	  weight: 0.060,
	  purchaseQuoteValue: 2.50,
	  notes: "",
	},
	"patty": {
	  id: "patty",
	  name: "Beef Patty",
	  category: ProductCategory.s.id,
	  unit: ProductUnit.KG.id,
	  weight: 0.100,
	  purchaseQuoteValue: 45.00,
	  notes: "",
	  recipe: [
		{ id: "beef", quantity: 0.100 },
	  ],
	},
	"beef": {
	  id: "beef",
	  name: "Ground Beef",
	  category: ProductCategory.m.id,
	  unit: ProductUnit.KG.id,
	  weight: null,
	  purchaseQuoteValue: 35.00,
	  notes: "",
	},
	"cheese": {
	  id: "cheese",
	  name: "Cheese Slice",
	  category: ProductCategory.m.id,
	  unit: ProductUnit.UN.id,
	  weight: 0.020,
	  purchaseQuoteValue: 1.20,
	  notes: "",
	},
  };
  
  const tree = createMaterialsTree({
	productsList: PRODUCTS_MAP,
	productCode: "cheeseburger",
	initialQuantity: 1,
  });

export default {
	async fetch(request, env, ctx): Promise<Response> {
		return new Response(JSON.stringify(tree, null, 2), {
			headers: { 'content-type': 'application/json' },
		});
	},
} satisfies ExportedHandler<Env>;
