import { useState } from 'react';
import InfiniteScroll from "react-infinite-scroller";
import axios from 'axios'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const style = {
    height: 30,
    border: "1px solid green",
    margin: 6,
    padding: 8
};

function Main() {
    const [items, setItems] = useState([])
    const [page, setPage] = useState(0)
    const [open, setOpen] = useState(false)
    const [paymentEnable, setPaymentEnable] = useState(false)
    const [dialogTitle, setDialogTitle] = useState(null)
    const [dialogPrice, setDialogPrice] = useState(null)
    const [loadingPayment, setLoadingPayment] = useState(false)
    const [customerName, setCustomerName] = useState(null)
    const [customerPhone, setCustomerPhone] = useState(null)

    const handleClickOpen = ((i) => {
        setPaymentEnable(false)
        setOpen(true);

        setCustomerName(null)
        setCustomerPhone(null)

        setDialogTitle(items[i].title)
        setDialogPrice(items[i].price)
        
        setPaymentEnable(true)
    })

    const handleClose = () => {
        setOpen(false);
    };

    const openPayment = (async () => {
        setLoadingPayment(true)
        const paymentUrl = (await axios({
            method: 'POST',
            url: `${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_USER_API_PORT}/user/checkout`,
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json'
            },
            data: {
                title: dialogTitle,
                customerName,
                customerPhone
            },
        })).data

        window.location.href = paymentUrl
    })

    const fetchMoreData = (async () => {
        const moreBooks = (await axios({
            method: 'GET',
            url: `${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_USER_API_PORT}/user/bookList?countPerPage=20&page=` + page.toString(),
        })).data
        setItems(items.concat(moreBooks))
        console.log(items)
        setPage(page + 1)
    })

    return (
        <div>
            <h1>demo: Book Store</h1>
            <hr />
            <InfiniteScroll
                pageStart={0}
                loadMore={fetchMoreData}
                hasMore={true}
                loader={<div className="loader" key={0}>Loading ...</div>}>
                {items.map((i, index) =>
                    <div id={index} style={style} key={index} onClick={(e) => handleClickOpen(index)}>                        
                        <Grid container alignItems="center">
                            <Grid item xs>
                                <Typography gutterBottom variant="h6" component="div">
                                {items[index].title}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography gutterBottom variant="h7" component="div">
                                {items[index].price}
                                </Typography>
                            </Grid>
                        </Grid>
                    </div>
                )}
            </InfiniteScroll>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"CHECKOUT"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                        Selected:
                    <Grid container alignItems="center">
                        <Grid item xs>
                            <Typography gutterBottom variant="h9" component="div">
                            {dialogTitle}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography gutterBottom variant="h9" component="div">
                            {dialogPrice}
                            </Typography>
                        </Grid>
                    </Grid>
                    <br/>
                    <Grid container alignItems="center">
                        <Grid item xs>
                            <Typography gutterBottom component="div">
                            <label>Customer Name:</label>
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography gutterBottom component="div">
                            <input type="text" id="customerName" name="customerName" onChange={(e) => setCustomerName(e.target.value)} /><br/>
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container alignItems="center">
                        <Grid item xs>
                            <Typography gutterBottom component="div">
                            <label>phone:</label>
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography gutterBottom component="div">
                                <input type="text" id="phone" name="phone" onChange={(e) => setCustomerPhone(e.target.value)}/>
                            </Typography>
                        </Grid>
                    </Grid>
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <LoadingButton disabled={!paymentEnable} loading={loadingPayment} onClick={openPayment} autoFocus>
                        Pay
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Main;