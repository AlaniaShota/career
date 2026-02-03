import LinkList from "./component/LinkList";

const Footer = () => {
  return (
    <div className="flex flex-col justify-center bg-gstore-midnight items-center w-5/6 mx-4 md:mx-auto mt-12 md:mt-20">
      <div className="w-full mb-4 border  border-b-soft-silver" />
      <h1 className={`md:text-start text-center text-soft-silver font-light w-full text-2xl`}>SJob</h1>
      <LinkList />
    </div>
  );
};

export default Footer;
