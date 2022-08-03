import {
  createStyles,
  Container,
  Group,
  ActionIcon,
  Text,
} from '@mantine/core';
import { BsTwitter, BsInstagram } from 'react-icons/bs';

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: 120,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column',
    },
  },

  links: {
    [theme.fn.smallerThan('xs')]: {
      marginTop: theme.spacing.md,
    },
  },
}));

export default function FooterSocial() {
  const { classes } = useStyles();

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Text size="lg" weight="bold" color="teal">
          CloudNotes
        </Text>
        <span>&copy;2022 | Raj Patel</span>
        <Group className={classes.links} position="right" noWrap>
          <ActionIcon size="lg" sx={{ '&:hover': { color: 'teal' } }}>
            <BsTwitter size={18} />
          </ActionIcon>
          <ActionIcon size="lg" sx={{ '&:hover': { color: 'teal' } }}>
            <BsInstagram size={18} />
          </ActionIcon>
        </Group>
      </Container>
    </div>
  );
}
