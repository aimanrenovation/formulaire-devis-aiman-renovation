import Image from "next/image";

interface MascotTipProps {
  image: string;
  text: string;
}

export function MascotTip({ image, text }: MascotTipProps) {
  return (
    <div className="flex items-start gap-3 bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
      <Image
        src={image}
        alt="Mascotte AIMAN"
        width={60}
        height={60}
        className="rounded-lg shrink-0"
      />
      <p className="text-sm text-gray-700 leading-relaxed">{text}</p>
    </div>
  );
}
