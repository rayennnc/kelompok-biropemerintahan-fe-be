import type { Schema, Struct } from '@strapi/strapi';

export interface BlocksHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_blocks_hero_sections';
  info: {
    description: '';
    displayName: 'Hero Section';
  };
  attributes: {
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    subheading: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksListBerita extends Struct.ComponentSchema {
  collectionName: 'components_blocks_list_beritas';
  info: {
    description: '';
    displayName: 'Berita List';
  };
  attributes: {
    judul: Schema.Attribute.String;
    limit: Schema.Attribute.Integer;
  };
}

export interface BlocksPimpinanOpd extends Struct.ComponentSchema {
  collectionName: 'components_blocks_pimpinan_opds';
  info: {
    displayName: 'Pimpinan OPD';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    jabatan: Schema.Attribute.String & Schema.Attribute.Required;
    namalengkap: Schema.Attribute.String & Schema.Attribute.Required;
    pangkat: Schema.Attribute.String;
  };
}

export interface ElementsCtabutton extends Struct.ComponentSchema {
  collectionName: 'components_elements_ctabuttons';
  info: {
    displayName: 'ctabutton';
  };
  attributes: {
    href: Schema.Attribute.String;
    isExternal: Schema.Attribute.Boolean;
    text: Schema.Attribute.String;
  };
}

export interface ElementsLink extends Struct.ComponentSchema {
  collectionName: 'components_elements_links';
  info: {
    description: '';
    displayName: 'Link';
  };
  attributes: {
    children: Schema.Attribute.Component<'elements.ctabutton', true>;
    href: Schema.Attribute.String;
    isExternal: Schema.Attribute.Boolean;
    text: Schema.Attribute.String;
  };
}

export interface ElementsLogo extends Struct.ComponentSchema {
  collectionName: 'components_elements_logos';
  info: {
    description: '';
    displayName: 'Logo';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
    logoText: Schema.Attribute.String;
    logoText2: Schema.Attribute.String;
    navigation: Schema.Attribute.Component<'elements.link', true>;
  };
}

export interface LayoutFooter extends Struct.ComponentSchema {
  collectionName: 'components_layout_footers';
  info: {
    description: '';
    displayName: 'Footer';
  };
  attributes: {
    address: Schema.Attribute.Text & Schema.Attribute.Required;
    copyright: Schema.Attribute.String & Schema.Attribute.Required;
    links: Schema.Attribute.Component<'elements.link', true>;
    logo: Schema.Attribute.Component<'elements.logo', false> &
      Schema.Attribute.Required;
    socmed: Schema.Attribute.Component<'elements.link', true> &
      Schema.Attribute.Required;
  };
}

export interface LayoutHeader extends Struct.ComponentSchema {
  collectionName: 'components_layout_headers';
  info: {
    displayName: 'Header';
  };
  attributes: {
    logo: Schema.Attribute.Component<'elements.logo', false> &
      Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'blocks.hero-section': BlocksHeroSection;
      'blocks.list-berita': BlocksListBerita;
      'blocks.pimpinan-opd': BlocksPimpinanOpd;
      'elements.ctabutton': ElementsCtabutton;
      'elements.link': ElementsLink;
      'elements.logo': ElementsLogo;
      'layout.footer': LayoutFooter;
      'layout.header': LayoutHeader;
    }
  }
}
