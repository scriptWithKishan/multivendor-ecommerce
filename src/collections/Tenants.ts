import type { CollectionConfig } from "payload";

export const Tenants: CollectionConfig = {
  slug: "tenants",
  admin: {
    useAsTitle: "slug",
  },
  fields: [
    {
      name: "name",
      required: true,
      type: "text",
      label: "Store name",
      admin: {
        description: "This is the name of the store (e.g. Kishan's store)",
      },
    },
    {
      name: "slug",
      type: "text",
      index: true,
      required: true,
      unique: true,
      admin: {
        description:
          "This is the subdomain for the store (e.g. [slug].name.com)",
      },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "razorpayAccountId",
      type: "text",
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: "razorpayDetailsSubmitted",
      type: "checkbox",
      admin: {
        readOnly: true,
        description:
          "You cannot create products until you submit your razorpay details",
      },
    },
  ],
};
