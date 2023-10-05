import Form from "@/components/Form/Form";
import FormButton from "@/components/Form/FormButton";
import FormField from "@/components/Form/FormField";
import SelectFormField from "@/components/Form/SelectField";
import { Button, Tabs } from "antd";
import { useRouter } from "next/router";
import React from "react";
import * as yup from "yup";

const { TabPane } = Tabs;

const initialValues = {
  name: "",
  codeClient: "",
  phone: "",
  profile: "",
  address: "",
  email: "",
  dob: "",
  pob: "",
  typeofId: "",
  dateIssued: "",
  placeIssued: "",
  authorityIssued: "",
  expDate: "",
  numId: "",
  numIMEI: "",
};

const validator = yup.object({
  name: yup.string().required("Name must be provided"),
  codeClient: yup.string().required("Client code must be provided"),
  phone: yup.number().required("Phone Number must be provided"),
  profile: yup.string().required("Profile must be provided"),
  address: yup.string().required("Address must be provided"),
  email: yup.string().email(),
  pob: yup.date(),
  dob: yup.date(),
  dateIssued: yup.date(),
  placeIssued: yup.string(),
  typeofId: yup.string(),
  numId: yup.string(),
  authorityIssued: yup.string(),
  expDate: yup.string(),
  numIMEI: yup.string().required("IMEI number must be provided"),
});
const Index = () => {
  const onChange = (key) => {
    console.log(key);
  };

  const handleSubmit = (values) => {
    console.log(values);
  };

  const router = useRouter();
  const { query } = router;

  const { edit, id } = query;

  const isDisabled = () => {
    if (edit === "true") {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div>
      <header className="flex space-x-4 mb-4 justify-between">
        <h2 className="text-lg font-bold">User Details </h2>
      </header>
      <Tabs className="bg-white !px-7  !py-5">
        <TabPane tab="Information Client" key="1">
          <div className="space-y-2">
            <div className="py-6 px-8 pb-3 bg-white rounded mb-8">
              <Form
                initialValues={initialValues}
                validationSchema={validator}
                onSubmit={handleSubmit}
              >
                <div className="row grid grid-cols-2 md:grid-cols-2 gap-4">
                  <div className="border !border-[#1A1A1A40] py-6 px-4 relative">
                    <h2 className="absolute text-primary -top-5 text-lg bg-white px-2">
                      Basic Information
                    </h2>
                    <div className="grid md:grid-cols-2">
                      <p>Name *</p>
                      <FormField name="name" label="12kk3" disabled={isDisabled()} />
                    </div>
                    <div className="grid md:grid-cols-2">
                      <p>Code Client *</p>
                      <FormField name="codeClient" disabled={true} />
                    </div>
                    <div className="grid md:grid-cols-2">
                      <p>Telephone *</p>
                      <FormField name="phone" disabled={isDisabled()} />
                    </div>
                    <div className="grid md:grid-cols-2 ">
                      <p>Profile *</p>
                      <SelectFormField
                        name="profile"
                        placeholder="Select Profile"
                        options={[{ value: 1, label: "one" }]}
                        disabled={isDisabled()}
                      />
                    </div>
                  </div>
                  <div className="border !border-[#1A1A1A40] py-6 px-4 relative">
                    <h2 className="absolute text-primary -top-5 text-lg bg-white px-2">
                      Contact Information
                    </h2>

                    <div className="grid md:grid-cols-2 ">
                      <p>Address *</p>
                      <FormField name="address" disabled={isDisabled()} />
                    </div>
                    <div className="grid md:grid-cols-2 ">
                      <p>Email </p>
                      <FormField name="email" disabled={isDisabled()} />
                    </div>
                    <div className="grid md:grid-cols-2 ">
                      <p>Date of Birth </p>
                      <FormField name="dob" disabled={true} />
                    </div>
                    <div className="grid md:grid-cols-2 ">
                      <p>Place of Birth </p>
                      <FormField name="pob" disabled={true} />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end pt-5 gap-x-1">
                  <div className="w-40 ">
                    <Button
                      type="outlined"
                      className="w-full !h-[38px] !rounded"
                    >
                      Cancel
                    </Button>
                  </div>
                  <div className="w-40 ">
                    <FormButton>Submit</FormButton>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </TabPane>
        <TabPane tab="Informations d'identification" key="2">
          <div className="space-y-2">
            <div className="py-6 px-8 pb-3 bg-white rounded mb-8">
              <Form
                initialValues={initialValues}
                validationSchema={validator}
                onSubmit={handleSubmit}
              >
                <div className="row grid grid-cols-2 md:grid-cols-2 gap-4">
                  <div className="border !border-[#1A1A1A40] py-6 px-4 relative">
                    <div className="grid md:grid-cols-2 ">
                      <p>Type of ID </p>
                      <SelectFormField
                        name="typeofId"
                        placeholder="Select Type of ID"
                        options={[{ value: 1, label: "one" }]}
                        disabled={isDisabled()}
                      />
                    </div>
                    <div className="grid md:grid-cols-2">
                      <p>Identification Number </p>
                      <FormField name="numId" disabled={isDisabled()} />
                    </div>
                    <div className="grid md:grid-cols-2">
                      <p>Date Issued </p>
                      <FormField name="dateIssued" disabled={true} />
                    </div>
                  </div>
                  <div className="border !border-[#1A1A1A40] py-6 px-4 relative">
                    <div className="grid md:grid-cols-2 ">
                      <p>Place Issued </p>
                      <FormField name="placeIssued" disabled={true} />
                    </div>
                    <div className="grid md:grid-cols-2 ">
                      <p>Authority that Issued </p>
                      <FormField name="authorityIssued" disabled={true} />
                    </div>
                    <div className="grid md:grid-cols-2 ">
                      <p>Date of Expiration </p>
                      <FormField name="expDate" disabled={true} />
                    </div>
                    <div className="grid md:grid-cols-2 ">
                      <p>IMEI Number *</p>
                      <FormField name="numIMEI" disabled={isDisabled()} />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end pt-5 gap-x-1">
                  <div className="w-40 ">
                    <Button
                      type="outlined"
                      className="w-full !h-[38px] !rounded"
                    >
                      Cancel
                    </Button>
                  </div>
                  <div className="w-40 ">
                    <FormButton>Submit</FormButton>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Index;
