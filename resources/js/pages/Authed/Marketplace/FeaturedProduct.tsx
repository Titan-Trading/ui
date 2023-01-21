import { createStyles, Overlay, Container, Title, Button, Text } from '@mantine/core';
import React from 'react';
import IProduct from '../../../models/Product';

const useStyles = createStyles((theme) => ({
  hero: {
    position: 'relative',
    backgroundImage:
      'url(https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },

  container: {
    height: 300,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingBottom: theme.spacing.xl,
    zIndex: 1,
    position: 'relative',

    [theme.fn.smallerThan('sm')]: {
      height: 200,
      paddingBottom: theme.spacing.sm,
    },
  },

  title: {
    color: theme.white,
    fontSize: 48,
    fontWeight: 900,
    lineHeight: 1.1,

    [theme.fn.smallerThan('sm')]: {
      fontSize: 24,
      lineHeight: 1.2,
    },

    [theme.fn.smallerThan('xs')]: {
      fontSize: 18,
      lineHeight: 1.3,
    },
  },

  user: {
    color: theme.white
  },

  description: {
    color: theme.white,
    maxWidth: 600,

    [theme.fn.smallerThan('sm')]: {
      maxWidth: '100%',
      fontSize: theme.fontSizes.sm,
    },
  },

  control: {
    marginTop: theme.spacing.xl * 1.5,

    [theme.fn.smallerThan('sm')]: {
      width: '100%',
    },
  },

  price: {
    marginLeft: theme.spacing.md,
    color: theme.white,
    [theme.fn.smallerThan('sm')]: {
      fontSize: theme.fontSizes.sm,
    },
  }
}));

const FeaturedProduct = ({id, image, title, description, userName, price, stats}:IProduct) => {
  const { classes } = useStyles();

  return (
    <div className={classes.hero}>
      <Overlay
        gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
        opacity={1}
        zIndex={0}
      />
      <Container className={classes.container}>
        <Title className={classes.title}>{title}</Title>
        <Text className={classes.user}>by {userName}</Text>
        <Text className={classes.description} size="xl" mt="xl">
          {description}
        </Text>

        <div>
          <Button variant="gradient" size="xl" radius="xl" className={classes.control}>
            Unlock now
          </Button>
          <span className={classes.price}>${price} / month</span>
        </div>
      
      </Container>
    </div>
  );
}

export default FeaturedProduct;