"use client";

import { Button, Form, Input, Layout } from "antd";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

interface FormType {
  userId: string;
  password: string;
}

const SignInComponent = () => {
  const router = useRouter();

  const handleSubmit = async (value: FormType) => {
    try {
      const res = await signIn("credentials", {
        redirect: false,
      });
      if (res?.status === 200) {
        router.push("/admin/users");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Layout.Content>
      <Form onFinish={handleSubmit}>
        <Form.Item name="userId">
          <Input name="userId" />
        </Form.Item>
        <Form.Item name="password">
          <Input type="password" />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">login</Button>
        </Form.Item>
      </Form>
    </Layout.Content>
  );
};

export default SignInComponent;
