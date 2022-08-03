import {
  createStyles,
  Image,
  Container,
  Title,
  Button,
  Group,
  Text,
  List,
  ThemeIcon,
} from '@mantine/core';
import { SimpleGrid, useMantineTheme } from '@mantine/core';
import { Photo, MessageCircle, Settings } from 'tabler-icons-react';
import { BsCheck2Circle } from 'react-icons/bs';
import image from '../../public/vite.svg';

const useStyles = createStyles((theme) => ({
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: theme.spacing.xl * 4,
    paddingBottom: theme.spacing.xl * 4,
  },

  content: {
    maxWidth: 480,
    marginRight: theme.spacing.xl * 3,

    [theme.fn.smallerThan('md')]: {
      maxWidth: '100%',
      marginRight: 0,
    },
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 44,
    lineHeight: 1.2,
    fontWeight: 900,

    [theme.fn.smallerThan('xs')]: {
      fontSize: 28,
    },
  },

  control: {
    [theme.fn.smallerThan('xs')]: {
      flex: 1,
    },
  },

  image: {
    flex: 1,

    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },

  highlight: {
    position: 'relative',
    backgroundColor: theme.fn.variant({
      variant: 'light',
      color: theme.primaryColor,
    }).background,
    borderRadius: theme.radius.sm,
    padding: '4px 12px',
  },
}));

export default function HeroBullets() {
  const { classes } = useStyles();
  return (
    <>
      <div>
        <Container>
          <div className={classes.inner}>
            <div className={classes.content}>
              <Title className={classes.title}>
                A <span className={classes.highlight}>modern</span> React <br />{' '}
                components library
              </Title>
              <Text color="dimmed" mt="md">
                Build fully functional accessible web applications faster than
                ever – Mantine includes more than 120 customizable components
                and hooks to cover you in any situation
              </Text>

              <List
                mt={30}
                spacing="sm"
                size="sm"
                icon={
                  <ThemeIcon size={20} radius="xl">
                    <BsCheck2Circle size={12} />
                  </ThemeIcon>
                }
              >
                <List.Item>
                  <b>TypeScript based</b> – build type safe applications, all
                  components and hooks export types
                </List.Item>
                <List.Item>
                  <b>Free and open source</b> – all packages have MIT license,
                  you can use Mantine in any project
                </List.Item>
                <List.Item>
                  <b>No annoying focus ring</b> – focus ring will appear only
                  when user navigates with keyboard
                </List.Item>
              </List>

              <Group mt={30}>
                <Button radius="xl" size="md" className={classes.control}>
                  Get started
                </Button>
                <Button
                  variant="default"
                  radius="xl"
                  size="md"
                  className={classes.control}
                >
                  Source code
                </Button>
              </Group>
            </div>
            <Image src="/vite.svg" className={classes.image} />
          </div>
        </Container>
      </div>
      <FeaturesGrid data={MOCKDATA} />
    </>
  );
}

export const MOCKDATA = [
  {
    icon: MessageCircle,
    title: 'Extreme performance',
    description:
      'This dust is actually a powerful poison that will even make a pro wrestler sick, Regice cloaks itself with frigid air of -328 degrees Fahrenheit',
  },
  {
    icon: MessageCircle,
    title: 'Privacy focused',
    description:
      'People say it can run at the same speed as lightning striking, Its icy body is so cold, it will not melt even if it is immersed in magma',
  },
  {
    icon: MessageCircle,
    title: 'No third parties',
    description:
      'They’re popular, but they’re rare. Trainers who show them off recklessly may be targeted by thieves',
  },
  {
    icon: MessageCircle,
    title: 'Secure by default',
    description:
      'Although it still can’t fly, its jumping power is outstanding, in Alola the mushrooms on Paras don’t grow up quite right',
  },
  {
    icon: MessageCircle,
    title: '24/7 Support',
    description:
      'Rapidash usually can be seen casually cantering in the fields and plains, Skitty is known to chase around after its own tail',
  },
];

export function Feature({ icon: Icon, title, description }) {
  const theme = useMantineTheme();
  return (
    <div>
      <ThemeIcon variant="light" size={40} radius={40}>
        <Icon size={20} stroke={1.5} />
      </ThemeIcon>
      <Text style={{ marginTop: theme.spacing.sm, marginBottom: 7 }}>
        {title}
      </Text>
      <Text size="sm" color="dimmed" style={{ lineHeight: 1.6 }}>
        {description}
      </Text>
    </div>
  );
}

const useStyles2 = createStyles((theme) => ({
  wrapper: {
    paddingTop: theme.spacing.xl * 4,
    paddingBottom: theme.spacing.xl * 4,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    marginBottom: theme.spacing.md,
    textAlign: 'center',

    [theme.fn.smallerThan('sm')]: {
      fontSize: 28,
      textAlign: 'left',
    },
  },

  description: {
    textAlign: 'center',

    [theme.fn.smallerThan('sm')]: {
      textAlign: 'left',
    },
  },
}));

function FeaturesGrid({ data = MOCKDATA }) {
  const { classes, theme } = useStyles2();
  const features = data.map((feature, index) => (
    <Feature {...feature} key={index} />
  ));

  return (
    <Container className={classes.wrapper}>
      <Title className={classes.title}>{'title'}</Title>

      <Container size={560} p={0}>
        <Text size="sm" className={classes.description}>
          {'description'}
        </Text>
      </Container>

      <SimpleGrid
        mt={60}
        cols={3}
        spacing={theme.spacing.xl * 2}
        breakpoints={[
          { maxWidth: 980, cols: 2, spacing: 'xl' },
          { maxWidth: 755, cols: 1, spacing: 'xl' },
        ]}
      >
        {features}
      </SimpleGrid>
    </Container>
  );
}
