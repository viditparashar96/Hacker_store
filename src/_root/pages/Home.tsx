import Banner from "@/components/home/Banner";
import SearchBar from "@/components/home/SearchBar";
import Footer from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import "./Home.css";
interface FormData {
  [key: string]: string;
}
const Home = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    price: "",
    image: "",
  });
  const [originalProducts, setOriginalProducts] = useState<FormData[]>([]);
  const [products, setProducts] = useState<FormData[]>([]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = () => {
    // Trim the values of formData
    const trimmedFormData = {
      name: formData.name.trim(),
      price: formData.price.trim(),
      image: formData.image.trim(),
    };

    if (
      !trimmedFormData.name ||
      !trimmedFormData.price ||
      !trimmedFormData.image
    ) {
      toast.error("All fields are required!!");
      return;
    }

    const isProductExists = products.some(
      (product) => product.name === trimmedFormData.name
    );
    if (isProductExists) {
      toast.error("Product already exists!!");
      return;
    }

    setProducts((prev) => [...prev, trimmedFormData]);
    setOriginalProducts((prev) => [...prev, trimmedFormData]);

    setFormData({ name: "", price: "", image: "" });

    toast.success("Product has been added!!");
  };

  const handleDelete = (index: number) => {
    const newProducts = products.filter((_, i) => i !== index);
    setProducts(newProducts);
    setOriginalProducts(newProducts);
    toast.success("Product has been deleted!!");
  };
  const handleEdit = (index: number) => {
    setFormData(products[index]);
  };
  const handleSearchFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;

    if (searchValue === "") {
      setProducts(originalProducts);
      return;
    }
    const newProducts = originalProducts.filter((product) => {
      return product.name.toLowerCase().includes(searchValue.toLowerCase());
    });
    setProducts(newProducts);
  };

  const handleEditSave = (index: number) => {
    console.log(index);
    // Trim the values of formData
    const trimmedFormData = {
      name: formData.name.trim(),
      price: formData.price.trim(),
      image: formData.image.trim(),
    };

    if (
      !trimmedFormData.name ||
      !trimmedFormData.price ||
      !trimmedFormData.image
    ) {
      toast.error("All fields are required!!");
      return;
    }

    const newProducts = products.map((product, i) => {
      if (i === index) {
        return trimmedFormData;
      }
      return product;
    });

    setProducts(newProducts);
    setOriginalProducts(newProducts);
    setFormData({ name: "", price: "", image: "" });

    toast.success("Product has been updated!!");
  };

  return (
    <>
      <Banner />

      <section className="bg-white py-8">
        <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12">
          <nav id="store" className="w-full z-30 top-0 px-6 py-1">
            <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3">
              <Link
                className="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl "
                to="#"
              >
                Store
              </Link>
              <div className="flex items-center gap-2" id="store-nav-content">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="default">Add Product</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Add Product</DialogTitle>
                      <DialogDescription>
                        Make changes to your Products here. Click save when
                        you're done.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Name
                        </Label>
                        <Input
                          id="name"
                          value={formData.name}
                          className="col-span-3"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                          price
                        </Label>
                        <Input
                          id="price"
                          value={formData.price}
                          className="col-span-3"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="image" className="text-right">
                          Img Url
                        </Label>
                        <Input
                          id="image"
                          value={formData.image}
                          className="col-span-3"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" onClick={handleSubmit}>
                        Save changes
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <SearchBar handleSearchFilter={handleSearchFilter} type="pc" />
              </div>
            </div>
            <SearchBar handleSearchFilter={handleSearchFilter} type="mobile" />
          </nav>

          {/* Displaying Products */}
          {products?.length > 0 ? (
            <>
              {products.map((product, index) => {
                return (
                  <div
                    key={index}
                    className="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col"
                  >
                    <Link to="#">
                      <div className="w-full bg-blue-400 h-[200px]">
                        <img
                          className="hover:grow hover:shadow-lg overflow-hidden object-cover object-center w-full h-full bg-gray-400"
                          src={product.image}
                        />
                      </div>
                      <div className="pt-3 flex items-center justify-between ">
                        <p className="">{product.name}</p>
                        <svg
                          className="h-6 w-6 fill-current text-gray-500 hover:text-black"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12,4.595c-1.104-1.006-2.512-1.558-3.996-1.558c-1.578,0-3.072,0.623-4.213,1.758c-2.353,2.363-2.352,6.059,0.002,8.412 l7.332,7.332c0.17,0.299,0.498,0.492,0.875,0.492c0.322,0,0.609-0.163,0.792-0.409l7.415-7.415 c2.354-2.354,2.354-6.049-0.002-8.416c-1.137-1.131-2.631-1.754-4.209-1.754C14.513,3.037,13.104,3.589,12,4.595z M18.791,6.205 c1.563,1.571,1.564,4.025,0.002,5.588L12,18.586l-6.793-6.793C3.645,10.23,3.646,7.776,5.205,6.209 c0.76-0.756,1.754-1.172,2.799-1.172s2.035,0.416,2.789,1.17l0.5,0.5c0.391,0.391,1.023,0.391,1.414,0l0.5-0.5 C14.719,4.698,17.281,4.702,18.791,6.205z" />
                        </svg>
                      </div>
                      <p className="pt-1 text-gray-900">${product.price}</p>
                    </Link>
                    <div className=" w-full flex gap-2">
                      <Button
                        variant="destructive"
                        className="mt-4"
                        onClick={() => handleDelete(index)}
                      >
                        Delete
                      </Button>
                      <div className="mt-4">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              onClick={() => handleEdit(index)}
                            >
                              Edit
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Edit Product</DialogTitle>
                              <DialogDescription>
                                Make changes to your Products here. Click save
                                when you're done.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                  Name
                                </Label>
                                <Input
                                  id="name"
                                  value={formData?.name}
                                  className="col-span-3"
                                  onChange={handleChange}
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="username"
                                  className="text-right"
                                >
                                  price
                                </Label>
                                <Input
                                  id="price"
                                  value={formData?.price}
                                  className="col-span-3"
                                  onChange={handleChange}
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="image" className="text-right">
                                  Img Url
                                </Label>
                                <Input
                                  id="image"
                                  value={formData?.image}
                                  className="col-span-3"
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button
                                type="submit"
                                onClick={() => handleEditSave(index)}
                              >
                                Save changes
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <div className="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col">
              <p>No Products Added Yet!!</p>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Home;
