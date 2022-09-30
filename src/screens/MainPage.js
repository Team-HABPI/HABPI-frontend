 

function ProductList() {
    return (
        <section>
               <Title />
            <Product />

            <Product />
        </section>
    );
}

const Title = () => {
    return <h2>Main Page</h2>;
}

const Description = () => {
    return <h1> Pedigree dog food </h1>;
}

const Product = () => {
    return( 
    <article> 

    <Image></Image> 
     <Description />
    </article>
    
    );
}

const Image = () => (
<img 
    src= 'https://images-na.ssl-images-amazon.com/images/I/81DsEA4QyyL.__AC_SX300_SY300_QL70_FMwebp_.jpg' alt='' /> );


const MainPage = (props) => {
    return (
    
    <ProductList />
        
    );
};
 
 

export default MainPage;
