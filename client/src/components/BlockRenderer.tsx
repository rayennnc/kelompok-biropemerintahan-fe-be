import type { Block } from "@/types";
import { HeroSection } from "@/components/blocks/HeroSection";
import { PimpinanOPD } from "@/components/blocks/PimpinanOPD";
import { VisiDanMisi } from "./blocks/VisiDanMisi";
import Kontak from "./blocks/Kontak";

function blockRenderer(block: Block, index: number) {
  switch (block.__component) {
    case "blocks.hero-section":
      return <HeroSection {...block} key={index} />
      case "blocks.pimpinan-opd":
      return <PimpinanOPD {...block} key={index} />
      case "blocks.visi-dan-misi":
        return <VisiDanMisi {...block} key={index} />
      case "blocks.kontak":
        return <Kontak {...block} key={index} />
    default:
      return null;
  }
}

export function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return blocks.map((block, index) => blockRenderer(block, index));
}