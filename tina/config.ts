import { defineConfig } from 'tinacms';

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || 'main';

export default defineConfig({
  branch,
  clientId: null, // Get this from tina.io
  token: null, // Get this from tina.io
  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    tina: {
      mediaRoot: 'images',
      publicFolder: 'public',
    },
  },
  schema: {
    collections: [
      {
        name: 'post',
        label: 'Posts',
        path: 'src/content/posts',
        format: 'mdx',
        ui: {
          // Добавляем кастомное превью
          router: ({ document }) => {
            return `/${document._sys.filename}`;
          },
        },
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Title',
            isTitle: true,
            required: true,
          },
          {
            type: 'datetime',
            name: 'date',
            label: 'Date',
            required: true,
          },
          {
            type: 'string',
            name: 'tags',
            label: 'Tags',
            list: true,
            ui: {
              component: 'tags',
            },
          },
          {
            type: 'string',
            name: 'category',
            label: 'Category',
            options: [
              'обучение',
              'технологии',
              'продуктивность',
              'дизайн',
              'бизнес',
              'образование',
              'рассылка',
              'проекты',
              'книги',
              'музыка',
              'социология',
            ],
            required: true,
          },
          {
            type: 'string',
            name: 'type',
            label: 'Type',
            options: [
              'статья',
              'гайд',
              'заметка',
              'обзор',
              'исследование',
              'рассылка',
              'проект',
              'рецензия',
            ],
            required: true,
          },
          {
            type: 'string',
            name: 'description',
            label: 'Description',
            ui: {
              component: 'textarea',
            },
          },
          {
            type: 'boolean',
            name: 'draft',
            label: 'Draft',
          },
          {
            type: 'image',
            name: 'heroImage',
            label: 'Hero Image',
            description: 'Full-width header image (optional)',
          },
          {
            type: 'string',
            name: 'heroAlt',
            label: 'Hero Image Alt Text',
            description: 'Alt text for hero image',
          },
          {
            type: 'string',
            name: 'heroLayout',
            label: 'Hero Layout',
            options: ['fullscreen', 'regular'],
          },
          {
            type: 'number',
            name: 'rating',
            label: 'Rating',
          },
          {
            type: 'string',
            name: 'relatedPosts',
            label: 'Related Posts',
            list: true,
            description: 'Slugs of related posts',
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Body',
            isBody: true,
            templates: [
              {
                name: 'TwoColumns',
                label: 'Two Columns',
                fields: [
                  {
                    name: 'gap',
                    label: 'Gap',
                    type: 'string',
                    options: ['small', 'medium', 'large'],
                  },
                  {
                    name: 'left',
                    label: 'Left Column',
                    type: 'rich-text',
                  },
                  {
                    name: 'right',
                    label: 'Right Column',
                    type: 'rich-text',
                  },
                ],
              },
              {
                name: 'ImageWide',
                label: 'Wide Image',
                fields: [
                  {
                    name: 'src',
                    label: 'Image Source',
                    type: 'image',
                  },
                  {
                    name: 'alt',
                    label: 'Alt Text',
                    type: 'string',
                    required: true,
                  },
                  {
                    name: 'caption',
                    label: 'Caption',
                    type: 'string',
                  },
                ],
              },
              {
                name: 'Callout',
                label: 'Callout',
                fields: [
                  {
                    name: 'type',
                    label: 'Type',
                    type: 'string',
                    options: ['info', 'warning', 'success'],
                  },
                  {
                    name: 'children',
                    label: 'Content',
                    type: 'rich-text',
                  },
                ],
              },
              {
                name: 'QuoteBlock',
                label: 'Quote Block',
                fields: [
                  {
                    name: 'quote',
                    label: 'Quote',
                    type: 'string',
                    required: true,
                    ui: {
                      component: 'textarea',
                    },
                  },
                  {
                    name: 'author',
                    label: 'Author',
                    type: 'string',
                  },
                  {
                    name: 'source',
                    label: 'Source',
                    type: 'string',
                  },
                  {
                    name: 'type',
                    label: 'Style',
                    type: 'string',
                    options: ['default', 'large', 'pullout'],
                  },
                ],
              },
              {
                name: 'StatsGrid',
                label: 'Stats Grid',
                fields: [
                  {
                    name: 'stats',
                    label: 'Stats',
                    type: 'object',
                    list: true,
                    fields: [
                      {
                        name: 'value',
                        label: 'Value',
                        type: 'string',
                        required: true,
                      },
                      {
                        name: 'label',
                        label: 'Label',
                        type: 'string',
                        required: true,
                      },
                      {
                        name: 'description',
                        label: 'Description',
                        type: 'string',
                      },
                    ],
                  },
                  {
                    name: 'columns',
                    label: 'Columns',
                    type: 'number',
                  },
                ],
              },
              {
                name: 'LinkList',
                label: 'Link List',
                fields: [
                  {
                    name: 'title',
                    label: 'Title',
                    type: 'string',
                  },
                  {
                    name: 'links',
                    label: 'Links',
                    type: 'object',
                    list: true,
                    fields: [
                      {
                        name: 'url',
                        label: 'URL',
                        type: 'string',
                        required: true,
                      },
                      {
                        name: 'title',
                        label: 'Title',
                        type: 'string',
                        required: true,
                      },
                      {
                        name: 'description',
                        label: 'Description',
                        type: 'string',
                      },
                      {
                        name: 'type',
                        label: 'Link Type',
                        type: 'string',
                        options: ['external', 'internal'],
                      },
                    ],
                  },
                ],
              },
              {
                name: 'BookCard',
                label: 'Book Card',
                fields: [
                  {
                    name: 'title',
                    label: 'Title',
                    type: 'string',
                    required: true,
                  },
                  {
                    name: 'author',
                    label: 'Author',
                    type: 'string',
                    required: true,
                  },
                  {
                    name: 'cover',
                    label: 'Cover',
                    type: 'image',
                  },
                  {
                    name: 'rating',
                    label: 'Rating',
                    type: 'number',
                  },
                  {
                    name: 'year',
                    label: 'Year',
                    type: 'number',
                  },
                  {
                    name: 'description',
                    label: 'Description',
                    type: 'string',
                    ui: {
                      component: 'textarea',
                    },
                  },
                  {
                    name: 'quotes',
                    label: 'Quotes',
                    type: 'string',
                    list: true,
                  },
                  {
                    name: 'amazonLink',
                    label: 'Amazon Link',
                    type: 'string',
                  },
                ],
              },
              {
                name: 'VideoEmbed',
                label: 'Video Embed',
                fields: [
                  {
                    name: 'url',
                    label: 'URL',
                    type: 'string',
                    required: true,
                  },
                  {
                    name: 'title',
                    label: 'Title',
                    type: 'string',
                  },
                ],
              },
              {
                name: 'Calendar',
                label: 'Calendar',
                fields: [],
              },
            ],
          },
        ],
      },
    ],
  },
});
