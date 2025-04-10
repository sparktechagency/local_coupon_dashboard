import { Button, Checkbox, Form, Input } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginAdminMutation } from "../../redux/api/authApi";
import { toast } from "sonner";

const Login = () => {
  const [loginAdmin , {isLoading}] = useLoginAdminMutation();
const navigate = useNavigate()
  // handle loging data
  const onFinish = (values) => {
    const data = {
      ...values,
    };
    console.log(data);
    loginAdmin(data)
      .unwrap()
      .then((payload) => {
        toast.success(payload?.message)
        console.log(payload?.data?.accessToken);
        if(payload?.data){
            localStorage.setItem('coupon_token' ,JSON.stringify( payload?.data?.accessToken))
            navigate("/")
        }
      })
      .catch((error) => toast.error(error?.data?.message));
  };
  return (
    <div
      className="gap-0 flex-col flex justify-center items-center"
      style={{
        width: "100%",
        background: "#E7E7E7",
        height: "100vh",
      }}
    >
      <div className="bg-white flex justify-center items-center rounded-lg">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          style={{
            width: "630px",
            background: "white",
            borderRadius: "12px",
            padding: "90px 57px",
          }}
          onFinish={onFinish}
        >
          <h1
            style={{ fontSize: "30px", color: "#38393E", textAlign: "center" }}
          >
            Login to Account
          </h1>

          <p
            style={{
              color: "#7D7E8A",
              textAlign: "center",
              marginBottom: "30px",
            }}
          >
            Please enter your email and password to continue
          </p>
          <div style={{ marginBottom: "24px" }}>
            <label
              htmlFor="email"
              style={{ display: "block", marginBottom: "5px" }}
            >
              {" "}
              Email address:{" "}
            </label>
            <Form.Item
              style={{ marginBottom: 0 }}
              name="email"
              id="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input
                placeholder="Enter your email address"
                type="email"
                style={{
                  border: "1px solid #E0E4EC",
                  height: "52px",
                  background: "white",
                  borderRadius: "8px",
                  outline: "none",
                }}
              />
            </Form.Item>
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label
              style={{ display: "block", marginBottom: "5px" }}
              htmlFor="password"
            >
              Password
            </label>
            <Form.Item
              style={{ marginBottom: 0 }}
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input.Password
                type="password"
                placeholder="Enter your password"
                style={{
                  border: "1px solid #E0E4EC",
                  height: "52px",
                  background: "white",
                  borderRadius: "8px",
                  outline: "none",
                }}
              />
            </Form.Item>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Form.Item name="remember_me" valuePropName="checked" noStyle>
              <Checkbox
                style={{ color: "#6A6D7C" }}
                className="custom-checkbox"
              >
                Remember me
              </Checkbox>
            </Form.Item>
            <Link
              className="login-form-forgot "
              style={{}}
              to="/auth/forgot-password"
            >
              Forgot Password
            </Link>
          </div>

          <Form.Item style={{ marginBottom: 0 }}>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button rounded-sm"
              block
              style={{
                height: "52px",
                fontWeight: "400px",
                fontSize: "18px",
                background: "#CD9B3A",
                marginTop: "56px",
              }}
            >
              <Link className="login-form-forgot " style={{ color: "white" }}>
              {
                isLoading ? "Sign In..." : "Sign In"
              }
                
              </Link>
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
