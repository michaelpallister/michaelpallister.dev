import Image from 'next/image';

const GameCard = ({
  title,
  completion,
  image,
  platform,
}: {
  title: string;
  completion: string;
  image: string;
  platform: string;
}) => {
  return (
    <li>
      <div className='h-0.5 bg-gradient-to-l from-surfie-green to-cyan rounded-tl rounded-tr'></div>
      <div className='bg-mine-shaft-solid rounded-bl rounded-br p-4 h-full'>
        <div className='flex items-start justify-between h-full'>
          <div className='mr-4 flex-1 flex flex-col justify-between h-full'>
            <p className='text-sm uppercase text-white font-medium mb-4 tracking-wide'>
              {title} - {completion}
            </p>
            <p className='bg-white place-self-start px-2 py-1 text-xs font-medium'>
              {platform}
            </p>
          </div>
          <div className='flex-shrink-0'>
            <Image
              src={image}
              height='56'
              width='100'
              alt=''
              objectFit='cover'
            />
          </div>
        </div>
      </div>
    </li>
  );
};

export default GameCard;
