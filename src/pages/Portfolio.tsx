import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Card } from "@material-ui/core";

const Portfolio: React.FC = () => {
  const [isDarkTheme, setIsDarkTheme] = useState<Boolean>(false);
  const auth = useContext(AuthContext);

  useEffect(() => {
    const data = JSON.parse(
      localStorage.getItem(`theme${auth.userId}`) || `${isDarkTheme}`
    );

    if (data) {
      setIsDarkTheme(data.value);
    }
  }, [isDarkTheme, auth.userId]);

  return (
    <Card>
      <div>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. A accusantium
        aliquid blanditiis, distinctio dolore ducimus, esse eum hic illum
        inventore necessitatibus omnis porro quae quibusdam quo ratione
        reprehenderit soluta temporibus.
      </div>
      <div>
        Amet aperiam assumenda blanditiis commodi cum cupiditate deserunt dolor
        dolore doloribus eaque expedita illo labore libero molestiae natus nisi
        officia, optio pariatur, porro quam quis quisquam quo similique
        temporibus voluptatibus!
      </div>
      <div>
        A ad animi consequuntur cumque dolor dolorum eaque eligendi enim ex
        facere fugiat fugit illum inventore laboriosam, laudantium magnam minus
        nesciunt omnis pariatur quod ratione soluta temporibus, ullam vel
        veritatis!
      </div>
    </Card>
  );
};

export default Portfolio;
