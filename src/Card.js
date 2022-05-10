import "./Card.css";

const Card = ({ id, imgSrc }) => {
  const { fundname } = {
    fundname: "Help to Support Ollie's Recovery",
  };
  return (
    <div id={id} className="card">
      <div className="card-background">
        <div className="card-inside">
          {fundname}
          <img src={imgSrc} />
        </div>
      </div>
    </div>
  );
};

export default Card;
