import LinkList from "./component/LinkList";

const Footer = () => {
  return (
    <div className="flex flex-col justify-around bg-soft-silver items-start lg:w-4/5 max-sm:w-11/12 mx-auto mt-20">
      <div className="w-full mb-4 border  border-b-gstore-midnight" />
      <h1 className={`text-start max-sm:text-center text-gstore-midnight font-light w-full text-2xl`}>SJob</h1>
      <LinkList />
      <h2
        className={`text-whiteSecond text-center w-full my-10 cursor-default`}
      >
      </h2>
    </div>
  );
};

export default Footer;
