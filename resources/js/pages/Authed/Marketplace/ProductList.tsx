import React from 'react';
import { createStyles, Card, Image, Text, Group, RingProgress, Grid } from '@mantine/core';
import { Link } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
    container: {
        padding: `${theme.spacing.xl}px ${theme.spacing.xl}px`,
    },
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: `${theme.spacing.sm}px ${theme.spacing.lg}px`,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
  },
}));

interface CardWithStatsProps {
  image: string;
  title: string;
  description: string;
  stats: {
    title: string;
    value: string;
  }[];
}

interface FeaturedCarouselProps {
    items: CardWithStatsProps[];
}

function CardWithStats({ image, title, description, stats }: CardWithStatsProps) {
  const { classes } = useStyles();

  const items = stats.map((stat) => (
    <div key={stat.title}>
      <Text size="xs" color="dimmed">
        {stat.title}
      </Text>
      <Text weight={500} size="sm">
        {stat.value}
      </Text>
    </div>
  ));

  return (
    <Card withBorder p="lg" className={classes.card}>
      <Card.Section>
        <Image src={image} alt={title} height={100} />
      </Card.Section>

      <Group position="apart" mt="xl">
        <Text size="sm" weight={700} className={classes.title}>
          {title}
        </Text>
        <Group spacing={5}>
          <Text size="xs" color="dimmed">
            80% completed
          </Text>
          <RingProgress size={18} sections={[{ value: 80, color: 'blue' }]} />
        </Group>
      </Group>
      <Text mt="sm" mb="md" color="dimmed" size="xs">
        {description}
      </Text>
      <Card.Section className={classes.footer}>{items}</Card.Section>
    </Card>
  );
}

const ProductList = ({ items }: FeaturedCarouselProps) => {
    const { classes } = useStyles();

    return (
        // grid of cards
        <Grid columns={12} className={classes.container}>
            {items.map((item: any, index) => (
                <Grid.Col key={index} span={3}>
                    <Link to={`/marketplace/${item.id}`}>
                      <CardWithStats key={index} {...item} />
                    </Link>
                </Grid.Col>
            ))}
        </Grid>
    );
};

export default ProductList;