import { useState } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

import InputField from "./Signup/InputField";
import SelectableField from "./Signup/SelectableField";
import Navbar from "@/components/Navbar";
import { RegisterContext } from "@/contexts/RegisterContext";
import { addUser, fetchUsers } from "@/services/api-client";
import { toast } from "sonner";

export type UserInfoType = {
  firstName: string;
  middleName: string;
  lastName: string;
  age: string;
  phone: string;
  gender: string;
  education: string;
  church: string;
  fellowShip: string;
};

export function SignupForm() {
  const [phoneClassName, setPhoneClassName] = useState<string>("");
  const [userInfo, setUserInfo] = useState<UserInfoType>({
    firstName: "",
    middleName: "",
    lastName: "",
    age: "",
    phone: "",
    gender: "",
    education: "",
    church: "",
    fellowShip: "",
  });

  async function handleSubmit() {
    // clean code? what is clean code? :)
    // refactor this when you have time
    try {
      const originalUserInfo = userInfo;
      if (
        userInfo.firstName &&
        userInfo.middleName &&
        userInfo.lastName &&
        userInfo.age &&
        userInfo.phone &&
        userInfo.church &&
        userInfo.education &&
        userInfo.fellowShip &&
        userInfo.gender
      ) {
        if (parseInt(originalUserInfo.age) > 13) {
          const result = await fetchUsers();
          const duplicatedNumber = result.find(
            (user: UserInfoType) => originalUserInfo.phone === user.phone
          );
          if (!duplicatedNumber) {
            setUserInfo({
              firstName: "",
              middleName: "",
              lastName: "",
              age: "",
              phone: "",
              gender: "",
              education: "",
              church: "",
              fellowShip: "",
            });
            toast("You registered successfully", {
              description: `Thank you for registering, ${userInfo.firstName} ${userInfo.middleName}`,
              className:
                "dark:bg-black bg-white text-emerald-700 dark:text-emerald-400 border-border border-2",
            });
            setPhoneClassName("");
            await addUser(originalUserInfo);
          } else {
            setUserInfo(originalUserInfo);
            setPhoneClassName("border-4 border-red-500 bg-red-500");
            toast("Phone number is already registered", {
              description: "Please use other phone number!",
              className: "dark:text-yellow-400 dark:bg-black text-red-500",
            });
          }
        } else {
          setUserInfo({
            firstName: "",
            middleName: "",
            lastName: "",
            age: "",
            phone: "",
            gender: "",
            education: "",
            church: "",
            fellowShip: "",
          });
          toast("You registered successfully", {
            description: `Thank you for registering, ${userInfo.firstName} ${userInfo.middleName}`,
            className:
              "dark:bg-black bg-white text-emerald-700 dark:text-emerald-400 border-border border-2",
          });
          setPhoneClassName("");
          await addUser(originalUserInfo);
        }
      } else {
        setUserInfo(originalUserInfo);
        toast("Input Field is Empty", {
          className: "dark:text-red-400 dark:bg-black text-red-500",
        });
      }
    } catch (err) {
      console.log(err);
      toast("Something went wrong", {
        className: "dark:text-red-400 dark:bg-black text-red-500",
      });
    }
  }

  return (
    <>
      <Navbar hideTabs={true} />
      <RegisterContext.Provider value={{ userInfo, setUserInfo }}>
        <div className="mt-10 flex justify-center items-center mb-10">
          <Card className="sm:mx-auto mx-0.5">
            <CardHeader className="mb-5">
              <CardTitle className="text-6xl text-center">GEP</CardTitle>
              <CardDescription className="text-center">
                Enter your information to create an account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid grid-cols-3 gap-4 grid-flow-row-dense">
                  <InputField
                    text="ስም"
                    name="firstName"
                    className="col-span-3 sm:col-span-1"
                    value={`${userInfo.firstName}`}
                  />
                  <InputField
                    text="የአባት ስም"
                    name="middleName"
                    className="col-span-3 sm:col-span-1"
                    value={`${userInfo.middleName}`}
                  />
                  <InputField
                    text="የአያት ስም"
                    name="lastName"
                    className="col-span-3 sm:col-span-1"
                    value={`${userInfo.lastName}`}
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <InputField
                    text="እድሜ"
                    name="age"
                    className="col-span-3 sm:col-span-1"
                    value={`${userInfo.age}`}
                  />
                  <InputField
                    text="ስልክ ቁጥር"
                    name="phone"
                    className="col-span-3 sm:col-span-1"
                    value={`${userInfo.phone}`}
                    inputClassName={phoneClassName}
                  />
                  <SelectableField
                    label="ጾታ"
                    option={["ወንድ", "ሴት"]}
                    name="gender"
                    className="col-span-3 sm:col-span-1"
                    value={`${userInfo.gender}`}
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <SelectableField
                    label="የትምህርት ደረጃ"
                    option={[
                      "1 - 8",
                      "8 - 10",
                      "11 - 12",
                      "ዩኒቨርሲቲ ተማሪ",
                      "ዩኒቨርሲቲ ተመራቂ",
                      "ሰራተኛ",
                      "ሌላ",
                    ]}
                    name="education"
                    className="col-span-3 sm:col-span-1"
                    value={`${userInfo.education}`}
                  />
                  <SelectableField
                    label="ቤተ ክርስቲያን"
                    option={[
                      "መካነ ኢየሱስ",
                      "ቃለ ህይወት",
                      "ሙሉ ወንጌል",
                      "መሰረተ ክርስቶስ",
                      "ሌላ",
                    ]}
                    name="church"
                    className="col-span-3 sm:col-span-1"
                    value={`${userInfo.church}`}
                  />
                  <SelectableField
                    label="ህብረት"
                    option={[
                      "ኳየር",
                      "አምልኮ",
                      "ስነ ጽሁፍ",
                      "ፋሬስ",
                      "ጸሎት",
                      "ወንጌል ስርጭት",
                      "ሌላ",
                      "መጽሃፍ ቅዱስ ጥናት",
                      "ፍቅር ማጋራት",
                      "እሁድ ትምህርት ቤት",
"መማክርት",
"ግቢ ውበት",
"እምነት ማጽኛ",
"ዲጂታል ቲም",
                    ]}
                    name="fellowShip"
                    className="col-span-3 sm:col-span-1"
                    value={`${userInfo.fellowShip}`}
                  />
                </div>
                {/* <DatePicker />*/}
                <Button
                  type="submit"
                  className="w-full mt-4"
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  Create an account
                </Button>
              </div>
            </CardContent>
            <p className="m-0 p-0 text-xs text-center mb-1">
              Created by:{" "}
              <span className="text-orange-500">HMYC Digital Team</span>
            </p>
          </Card>
        </div>
      </RegisterContext.Provider>
    </>
  );
}
