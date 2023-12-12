import { useEffect, useState } from "react";
import { getAIResponse } from "./helper";

export const file = "I was driving a friend's car and t-boned another vehicle while going through a green light. " +
"The other driver was taking a left turn while their traffic signal had a flashing yellow. They pulled out in front of me with no time to react. " +
"I have dash cam footage and both cars were totaled. I'm still getting treatment for my leg which was broken in the accident.";

type InputProps = {
  data: string
}

export const AIResponse = ({data}: InputProps) => {
    const [aiResponse, setaiResponse] = useState<any>();
  
    useEffect(() => {
      const init = async () => {
        const _aiResponse = await getAIResponse(data);
        //console.log(data.toString());
        setaiResponse(_aiResponse);
        console.log("AI Response: " + _aiResponse);
      };
      init();
    }, [aiResponse, data]);
  
    return (
      <>
          <div>
            <text>{`${aiResponse}`}</text> 
          </div>
      </>
    );
  }