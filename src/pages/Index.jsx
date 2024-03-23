import React, { useState } from "react";
import { Box, Heading, Text, Input, Button, Image, Grid, FormControl, FormLabel, Textarea, useToast } from "@chakra-ui/react";

const Index = () => {
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [properties, setProperties] = useState([]);
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!address || !description || !image) {
      toast({
        title: "Please fill in all fields",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    const newProperty = {
      id: Date.now(),
      address,
      description,
      image,
    };
    setProperties([...properties, newProperty]);
    setAddress("");
    setDescription("");
    setImage(null);
    toast({
      title: "Property added",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box maxWidth="800px" margin="auto" padding={8}>
      <Heading as="h1" size="xl" textAlign="center" marginBottom={8}>
        Construction Photo Categorizer
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl id="address" marginBottom={4}>
          <FormLabel>Property Address</FormLabel>
          <Input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        </FormControl>
        <FormControl id="description" marginBottom={4}>
          <FormLabel>Photo Description</FormLabel>
          <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </FormControl>
        <FormControl id="image" marginBottom={4}>
          <FormLabel>Upload Photo</FormLabel>
          <Input type="file" accept="image/*" onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))} />
        </FormControl>
        <Button type="submit" colorScheme="blue">
          Add Property
        </Button>
      </form>
      <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={8} marginTop={8}>
        {properties.map((property) => (
          <Box key={property.id} borderWidth={1} borderRadius="lg" padding={4}>
            <Image src={property.image} alt={property.address} marginBottom={4} />
            <Heading as="h2" size="md" marginBottom={2}>
              {property.address}
            </Heading>
            <Text>{property.description}</Text>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default Index;
