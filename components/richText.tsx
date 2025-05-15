import { RichTextObj } from "@/sanity/types"
import { TailwindProps } from "@/types"
import { PortableText } from "next-sanity";
import { PaddingContainer } from "./atoms";

export interface RichTextProps extends TailwindProps {
  id: RichTextObj['id'];
  value: RichTextObj['value'];
  paddingBlock: RichTextObj['paddingBlock'];
}

export const RichText = ({ className, id, value, paddingBlock }: RichTextProps) => {

  return value && (
    <PaddingContainer id={id} padding={{_type: 'paddingBlock', ...paddingBlock}} className={`text-text-light flex flex-col gap-4 ${className}`}>
      <PortableText value={value} />
    </PaddingContainer>
  )
}