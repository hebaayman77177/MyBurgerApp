import BurgerIngredient from './BurgerIngrediant/BurgerIngrediant';
import classes from './Burger.module.css';

const burger = (props)=>{
    console.log(props.ingrediants);
    let transformedIngredient = Object.keys(props.ingrediants)
    .map(igkey=>{
        return [...Array(props.ingrediants[igkey])].map((_,i)=>{
            return <BurgerIngredient type={igkey}  key={igkey+i} />
        })
    }).reduce((arr,el)=>{
        return arr.concat(el);
    },[])
    if(transformedIngredient.length===0){
        transformedIngredient=<p>please add ingrediants!</p>;
    }
    console.log(transformedIngredient)
    return (

        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredient}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default burger;