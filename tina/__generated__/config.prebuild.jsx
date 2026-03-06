// tina/config.ts
import { defineConfig } from "tinacms";
var branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";
var config_default = defineConfig({
  branch,
  clientId: null,
  // Get this from tina.io
  token: null,
  // Get this from tina.io
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "src/content/posts",
        format: "mdx",
        ui: {
          // Добавляем кастомное превью
          router: ({ document }) => {
            return `/${document._sys.filename}`;
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
            required: true
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
            ui: {
              component: "tags"
            }
          },
          {
            type: "string",
            name: "category",
            label: "Category",
            options: [
              "\u043E\u0431\u0443\u0447\u0435\u043D\u0438\u0435",
              "\u0442\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438\u0438",
              "\u043F\u0440\u043E\u0434\u0443\u043A\u0442\u0438\u0432\u043D\u043E\u0441\u0442\u044C",
              "\u0434\u0438\u0437\u0430\u0439\u043D",
              "\u0431\u0438\u0437\u043D\u0435\u0441",
              "\u043E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u0438\u0435",
              "\u0440\u0430\u0441\u0441\u044B\u043B\u043A\u0430",
              "\u043F\u0440\u043E\u0435\u043A\u0442\u044B",
              "\u043A\u043D\u0438\u0433\u0438",
              "\u043C\u0443\u0437\u044B\u043A\u0430",
              "\u0441\u043E\u0446\u0438\u043E\u043B\u043E\u0433\u0438\u044F"
            ],
            required: true
          },
          {
            type: "string",
            name: "type",
            label: "Type",
            options: [
              "\u0441\u0442\u0430\u0442\u044C\u044F",
              "\u0433\u0430\u0439\u0434",
              "\u0437\u0430\u043C\u0435\u0442\u043A\u0430",
              "\u043E\u0431\u0437\u043E\u0440",
              "\u0438\u0441\u0441\u043B\u0435\u0434\u043E\u0432\u0430\u043D\u0438\u0435",
              "\u0440\u0430\u0441\u0441\u044B\u043B\u043A\u0430",
              "\u043F\u0440\u043E\u0435\u043A\u0442",
              "\u0440\u0435\u0446\u0435\u043D\u0437\u0438\u044F"
            ],
            required: true
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            ui: {
              component: "textarea"
            }
          },
          {
            type: "boolean",
            name: "draft",
            label: "Draft"
          },
          {
            type: "image",
            name: "heroImage",
            label: "Hero Image",
            description: "Full-width header image (optional)"
          },
          {
            type: "string",
            name: "heroAlt",
            label: "Hero Image Alt Text",
            description: "Alt text for hero image"
          },
          {
            type: "string",
            name: "heroLayout",
            label: "Hero Layout",
            options: ["fullscreen", "regular"]
          },
          {
            type: "number",
            name: "rating",
            label: "Rating"
          },
          {
            type: "string",
            name: "relatedPosts",
            label: "Related Posts",
            list: true,
            description: "Slugs of related posts"
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
            templates: [
              {
                name: "TwoColumns",
                label: "Two Columns",
                fields: [
                  {
                    name: "gap",
                    label: "Gap",
                    type: "string",
                    options: ["small", "medium", "large"]
                  },
                  {
                    name: "left",
                    label: "Left Column",
                    type: "rich-text"
                  },
                  {
                    name: "right",
                    label: "Right Column",
                    type: "rich-text"
                  }
                ]
              },
              {
                name: "ImageWide",
                label: "Wide Image",
                fields: [
                  {
                    name: "src",
                    label: "Image Source",
                    type: "image"
                  },
                  {
                    name: "alt",
                    label: "Alt Text",
                    type: "string",
                    required: true
                  },
                  {
                    name: "caption",
                    label: "Caption",
                    type: "string"
                  }
                ]
              },
              {
                name: "Callout",
                label: "Callout",
                fields: [
                  {
                    name: "type",
                    label: "Type",
                    type: "string",
                    options: ["info", "warning", "success"]
                  },
                  {
                    name: "children",
                    label: "Content",
                    type: "rich-text"
                  }
                ]
              },
              {
                name: "QuoteBlock",
                label: "Quote Block",
                fields: [
                  {
                    name: "quote",
                    label: "Quote",
                    type: "string",
                    required: true,
                    ui: {
                      component: "textarea"
                    }
                  },
                  {
                    name: "author",
                    label: "Author",
                    type: "string"
                  },
                  {
                    name: "source",
                    label: "Source",
                    type: "string"
                  },
                  {
                    name: "type",
                    label: "Style",
                    type: "string",
                    options: ["default", "large", "pullout"]
                  }
                ]
              },
              {
                name: "StatsGrid",
                label: "Stats Grid",
                fields: [
                  {
                    name: "stats",
                    label: "Stats",
                    type: "object",
                    list: true,
                    fields: [
                      {
                        name: "value",
                        label: "Value",
                        type: "string",
                        required: true
                      },
                      {
                        name: "label",
                        label: "Label",
                        type: "string",
                        required: true
                      },
                      {
                        name: "description",
                        label: "Description",
                        type: "string"
                      }
                    ]
                  },
                  {
                    name: "columns",
                    label: "Columns",
                    type: "number"
                  }
                ]
              },
              {
                name: "LinkList",
                label: "Link List",
                fields: [
                  {
                    name: "title",
                    label: "Title",
                    type: "string"
                  },
                  {
                    name: "links",
                    label: "Links",
                    type: "object",
                    list: true,
                    fields: [
                      {
                        name: "url",
                        label: "URL",
                        type: "string",
                        required: true
                      },
                      {
                        name: "title",
                        label: "Title",
                        type: "string",
                        required: true
                      },
                      {
                        name: "description",
                        label: "Description",
                        type: "string"
                      },
                      {
                        name: "type",
                        label: "Link Type",
                        type: "string",
                        options: ["external", "internal"]
                      }
                    ]
                  }
                ]
              },
              {
                name: "BookCard",
                label: "Book Card",
                fields: [
                  {
                    name: "title",
                    label: "Title",
                    type: "string",
                    required: true
                  },
                  {
                    name: "author",
                    label: "Author",
                    type: "string",
                    required: true
                  },
                  {
                    name: "cover",
                    label: "Cover",
                    type: "image"
                  },
                  {
                    name: "rating",
                    label: "Rating",
                    type: "number"
                  },
                  {
                    name: "year",
                    label: "Year",
                    type: "number"
                  },
                  {
                    name: "description",
                    label: "Description",
                    type: "string",
                    ui: {
                      component: "textarea"
                    }
                  },
                  {
                    name: "quotes",
                    label: "Quotes",
                    type: "string",
                    list: true
                  },
                  {
                    name: "amazonLink",
                    label: "Amazon Link",
                    type: "string"
                  }
                ]
              },
              {
                name: "VideoEmbed",
                label: "Video Embed",
                fields: [
                  {
                    name: "url",
                    label: "URL",
                    type: "string",
                    required: true
                  },
                  {
                    name: "title",
                    label: "Title",
                    type: "string"
                  }
                ]
              },
              {
                name: "Calendar",
                label: "Calendar",
                fields: []
              }
            ]
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
