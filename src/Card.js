import "./Card.css";

const Card = ({ id }) => {
  const { fundname } = {
    fundname: "Help to Support Ollie's Recovery",
  };
  return (
    <div id={id} className="card">
      <div className="card-background">
        <div className="card-inside">{fundname}</div>
      </div>
    </div>
  );
};

export default Card;
