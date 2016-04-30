#How to try out without any setup
http://prajitp.github.io/emiCalculator

#How to setup locally
-  Download project directory on your client
```
git init
git clone https://github.com/PrajitP/emiCalculator.git
```
- Run simple http server
```
python -m SimpleHTTPServer
```
- Http server will start at 8000 port, in your browse URL paste
```
http://localhost:8000/
```

#How to use
- Click on Emi tab at top left corner.
- Fill the form.
- Click "Update" button.
- Edit/update any "Installment" section you want and recompute profit/loss and click "Update".
- "Difference in Interest" section shows above profit/loss with respect to default EMI amount.
- Click "Reset" when you want to clear all history.
