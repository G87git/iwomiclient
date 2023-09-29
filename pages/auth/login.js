import React from "react";
import { Form, Card, Modal } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import Button from "@/components/button";
import Input from "@/components/Input";
import apiClient from "api";
import { Encrpt } from "utils/passwordUtils";
import { useDisclosure } from "hooks";

export default function Login() {
  const [form] = Form.useForm();
  const [loginForm] = Form.useForm();
  const reducer = (prevState, action) => ({ ...prevState, ...action });
  const [state, dispatch] = React.useReducer(reducer, { loading: false });
  const { open, onClose, onOpen } = useDisclosure();
  const router = useRouter();

  // async function loginUser(user) {
  //   dispatch({ loading: true });

  //   try {
  //     const body = {
  //       ...user,
  //       pass: Encrpt(window.btoa(user.pass)),
  //       cetab: "001",
  //     };

  //     let response = await apiClient({
  //       method: "post",
  //       url: "/auth/loginAdmin",
  //       body,
  //     });
  //     dispatch({ loading: false });
  //     if (response.data.status === "01") {
  //       localStorage.setItem("token", response.data.token);
  //       router.push("/");
  //     } else if (response.data.status === "03") {
  //       // dispatch({oldpasword: response.data.password})
  //       onOpen();
  //     } else if (response.data.status === "02") {
  //       Modal.error({ title: "Login Fail. Incorrect credentials." });
  //     } else {
  //       Modal.error({
  //         title: "An error occured!",
  //         content: <p>{response.data.message}</p>,
  //       });
  //     }
  //     console.log(response);
  //   } catch {
  //     Modal.error({
  //       title: "Unable to login. Check your credentials and try again",
  //     });
  //   }
  // }
  // async function modifyPassword(user) {
  //   dispatch({ loading: true });

  //   try {
  //     const body = {
  //       ...user,
  //       uname: loginForm.getFieldValue("uname"),
  //       oldpasword: Encrpt(window.btoa(loginForm.getFieldValue("pass"))),
  //       newpassword: Encrpt(window.btoa(form.getFieldValue("newpassword"))),

  //       cetab: "001",
  //     };

  //     delete body.n_pass;

  //     let response = await apiClient({
  //       method: "post",
  //       url: "/auth/UpdateAdminPassword",
  //       body,
  //     });
  //     if (response.data.status === "01") {
  //       onClose();
  //     } else if (response.data.status === "03") {
  //       onOpen();
  //     }
  //     console.log(response);
  //   } catch {
  //     Modal.error({
  //       title: "An error occured changing your password",
  //     });
  //   }
  // }

  // const validatePassword = (rule, value, callback) => {
  //   if (value && value !== form.getFieldValue("n_pass")) {
  //     callback("Password do not match");
  //   } else {
  //     callback();
  //   }
  // };

  return (
    <div className="relative">
      <img
        className="absolute inset-0 w-screen h-screen object-cover"
        src="/assets/images/bg.jpg"
      />
      <div className="w-full min-h-screen px-8 py-20 relative flex items-center justify-center flex-col space-y-4 bg-black/70">
        <div className=" w-full max-w-md mx-auto mt-10 relative">
          <Card className="w-full border">
            <div className="flex flex-col items-center mb-4">
              <img className="w-40" src="/assets/images/iwomi.png" />
            </div>

            <Form
              // onFinish={loginUser}
              // form={loginForm}
              name="login"
              layout="vertical"
            >
              <Form.Item
                label="Username"
                name="uname"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                />
              </Form.Item>
              <Form.Item
                label="Password"
                name="pass"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>

              <Button
                htmlType="submit"
                loading={state.loading}
                className="w-full"
              >
                Login
              </Button>
            </Form>
          </Card>
        </div>

        <h6 className="text-white">
          {new Date().getFullYear()} © IWOMI Technologies Ltd.
        </h6>
      </div>

      <Modal
        visible={open}
        onCancel={onClose}
        onOk={form.submit}
        title="Modify Password"
      >
        <p>It's your first Login. Modify your password</p>
        <Form
          form={form}
          // onFinish={modifyPassword}
          name="login"
          layout="vertical"
        >
          <Form.Item
            label="New Password"
            name="n_pass"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="newpassword"
            // rules={[
            //   { required: true, message: "Please input your password!" },
            //   { validator: validatePassword },
            // ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
