import { useEffect, useState } from "react";
import { getAIResponse, getGptResponse } from "./helper";

export const file = "I was driving a friend's car and t-boned another vehicle while going through a green light. " +
"The other driver was taking a left turn while their traffic signal had a flashing yellow. They pulled out in front of me with no time to react. " +
"I have dash cam footage and both cars were totaled. I'm still getting treatment for my leg which was broken in the accident.";

type InputProps = {
  data: string
}

export const AIResponse = ({data}: InputProps) => {
    const [aiResponse, setaiResponse] = useState<any>();
    const [hasFetched, setHasFetched] = useState(false);

    useEffect(() => {
      const init = async () => {
        let _aiResponse;
        if (!data && !hasFetched) {
          _aiResponse = await getGptResponse();
          setaiResponse(_aiResponse);
          console.log("AI Response: " + _aiResponse);
          setHasFetched(true);
        }
        else if (data && hasFetched) {
          _aiResponse = await getAIResponse(data);
          setaiResponse(_aiResponse);
          console.log("AI Response: " + _aiResponse);
        }
        //console.log(data.toString());
        
      };
      init();
      return () => {};
    }, [aiResponse, data]);
  
    return (
      <>
          <div>
            <text>{`${aiResponse}`}</text> 
          </div>
      </>
    );
  }