import { Box } from "@mantine/core";
import { Anchor, Button, Container, Group, Text } from "@mantine/core";
import { Link } from "react-router-dom";
const About = () => {
  return (
    <>
      <Box style={{ maxWidth: "720px" }} mx="auto" my="lg">
        I am 19 y/o wannabe quote-unquote Developer. I am interested in web
        development, serverless technologies and I live on the Edge (pun
        intended).
        <br />I am currently enrolled in Nirma University pursuing my Bechlor's
        degree in Comouter Science Engineering. Apart from code and study (which
        takes major time in my day), in my free time I enjoy listening to music,
        reading books and scrolling my Twitter.
        <br />
        Find me{" "}
        <Anchor
          component={"a"}
          target="_blank"
          href="https://raj-dev.vercel.app"
          size="md"
        >
          here
        </Anchor>
      </Box>
    </>
  );
};

export default About;
