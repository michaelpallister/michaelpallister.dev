import Image from "next/legacy/image";

const GameCard = ({
  title,
  completion,
  image,
  platform,
  platinum,
  index,
}: {
  title: string;
  completion: string;
  image: string;
  platform: string;
  platinum: boolean;
  index: number;
}) => {
  const platinumClassName =
    "bg-gradient-to-r from-slate-500 to-slate-800 rounded-bl rounded-br p-4 h-full";

  return (
    <li className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% relative">
      {index === 0 ? (
        <div className="absolute right-1 bottom-1 text-[10px] tracking-wider text-white bg-emerald-500 p-1 font-semibold opacity-85 z-10">
          Currently playing
        </div>
      ) : null}
      <div className="h-0.5 bg-gradient-to-l from-surfie-green to-cyan rounded-tl rounded-tr"></div>
      <div
        className={
          platinum
            ? platinumClassName
            : "bg-mine-shaft-solid rounded-bl rounded-br p-4 h-full"
        }
      >
        <div className="flex items-start justify-between h-full">
          <div className="mr-4 flex-1 flex flex-col justify-between h-full">
            <p className="text-sm text-gray-300 mb-4 font-medium tracking-tight">
              {title} - {completion}
            </p>
            <p className="bg-white text-mine-shaft place-self-start px-2 py-1 text-xs font-extrabold rounded">
              {platform}
            </p>
          </div>
          <div className="flex-shrink-0">
            <Image
              src={image}
              height="56"
              width="100"
              alt=""
              objectFit="cover"
            />
          </div>
        </div>
      </div>
    </li>
  );
};

export default GameCard;
