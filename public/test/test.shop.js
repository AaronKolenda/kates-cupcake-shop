describe("Kate's Cupcake Shop LLC. A Delaware Company", function(){

  describe("cupcakeShop.addFlavor", function(){

    it("exists", function(){
      expect(cupcakeShop.addFlavor).to.be.a("function");
    });

    it("can create new flavors", function(){
      resetShop();

      cupcakeShop.addFlavor("chocolate");
      expect(cupcakeShop.inventory).to.have.keys("chocolate");
      cupcakeShop.addFlavor("vanilla");
      expect(cupcakeShop.inventory).to.have.keys("vanilla", "chocolate");
      cupcakeShop.addFlavor("strawberry");
      expect(cupcakeShop.inventory).to.have.keys("vanilla", "chocolate", "strawberry");

      expect(cupcakeShop.inventory).to.deep.equal({
        chocolate: { stock: 0, price: 0},
        vanilla: { stock: 0, price: 0},
        strawberry: { stock: 0, price: 0}
      })

    });

    it("doesn't overwrite existing flavors", function(){
      resetShop();

      cupcakeShop.addFlavor("chocolate");
      cupcakeShop.inventory.chocolate.stock = 10;

      cupcakeShop.addFlavor("chocolate");

      expect(cupcakeShop.inventory).to.have.keys("chocolate");
      expect(cupcakeShop.inventory.chocolate.stock).to.equal(10);
    });

  });

  describe("cupcakeShop.removeFlavor", function(){

    it("exists", function(){
      expect(cupcakeShop.removeFlavor).to.be.a("function");
    });

    it("removes flavors", function(){
      resetShop();

        cupcakeShop.inventory = {
        chocolate: {stock: 10, price: 0},
        vanilla: {stock: 5, price: 0},
        "red velvet": {stock: 15, price: 0}
      }

      cupcakeShop.removeFlavor("red velvet"); // so gross

      expect(cupcakeShop.inventory).to.have.keys("chocolate", "vanilla");
      expect(cupcakeShop.inventory).to.not.have.keys("red velvet");
    });

  });

  describe("cupcakeShop.listFlavors", function(){

    it("exists", function(){
      expect(cupcakeShop.listFlavors).to.be.a("function");
    });

    it("returns empty array if there's no inventory", function(){
      resetShop();

      expect(cupcakeShop.listFlavors()).to.deep.equal([]);
    });

    it("lists cupcake flavors", function(){
      resetShop();

      cupcakeShop.inventory = {
        chocolate: {stock: 10, price: 0},
        vanilla: {stock: 5, price: 0},
        strawberry: {stock: 14, price: 0},
        "red velvet": {stock: 10, price: 0}
      }

      expect(cupcakeShop.listFlavors()).to.be.same.members([
        "chocolate",
        "vanilla",
        "strawberry",
        "red velvet"
      ]);
    });

  });


  describe("cupcakeShop.showStock", function(){

    it("exists", function(){
      expect(cupcakeShop.showStock).to.be.a("function");
    });

    it("shows stock of existing flavors", function(){
      resetShop();

      cupcakeShop.inventory = {
        vanilla: {stock: 20, price: 0},
        chocolate: {stock: 0, price: 0}
      }

      expect(cupcakeShop.showStock("vanilla")).to.equal(20)
      expect(cupcakeShop.showStock("chocolate")).to.equal(0)
    })

    it("returns 0 for non-existent flavors", function(){
      resetShop();

      cupcakeShop.inventory = {
        vanilla: {stock: 20, price: 0}
      }

      expect(cupcakeShop.showStock("strawberry")).to.equal(0)
    })

  });

  describe("cupcakeShop.restock", function(){

    it("exists", function(){
      expect(cupcakeShop.restock).to.be.a("function");
    });

    it("adds to stock of existing flavors", function(){
      resetShop();

      cupcakeShop.inventory = {
        chocolate: {stock: 8, price: 0},
        vanilla: {stock: 4, price: 0},
        strawberry: {stock: 0, price: 0}
      }

      cupcakeShop.restock("vanilla", 10)
      cupcakeShop.restock("strawberry", 3)
      
      expect(cupcakeShop.inventory).to.deep.equal({
        chocolate: {stock: 8, price: 0},
        vanilla: {stock: 14, price: 0},
        strawberry: {stock: 3, price: 0}
      })
    });

    it("doesn't add to stock of existing flavors", function(){
      resetShop();

      cupcakeShop.inventory = {
        chocolate: {stock: 8, price: 0},
        vanilla: {stock: 4, price: 0}
      }

      cupcakeShop.restock("rhubarb", 6)
      
      expect(cupcakeShop.inventory).to.deep.equal({
        chocolate: {stock: 8, price: 0},
        vanilla: {stock: 4, price: 0}
      })
    });

  });

  describe("cupcakeShop.makeSale", function(){

    it("exists", function(){
      expect(cupcakeShop.makeSale).to.be.a("function");
    });

    it("should make a sale", function(){
      resetShop();

      cupcakeShop.inventory = {
        chocolate: {stock: 5, price: 0},
        strawberry: {stock: 3, price: 0}
      }

      var saleResult = cupcakeShop.makeSale("chocolate");

      expect(saleResult).to.equal(true);
      expect(cupcakeShop.register).to.equal(3);
      expect(cupcakeShop.inventory).to.deep.equal({
        chocolate: {stock: 4, price: 0},
        strawberry: {stock: 3, price: 0}
      })
    });

    it("should not sell an out of stock cupcake", function(){
      resetShop();

      cupcakeShop.inventory = {
        chocolate: {stock: 5, price: 0},
        strawberry: {stock: 0, price: 0}
      }

      var saleResult = cupcakeShop.makeSale("strawberry");

      expect(saleResult).to.equal(false);
      expect(cupcakeShop.register).to.equal(0);
      expect(cupcakeShop.inventory).to.deep.equal({
        chocolate: {stock: 5, price: 0},
        strawberry: {stock: 0, price: 0}
      })

    });

    it("should not sell an non-existent flavor", function(){
      resetShop();

      cupcakeShop.inventory = {
        chocolate: {stock: 5, price: 0},
        strawberry: {stock: 3, price: 0}
      }

      var saleResult = cupcakeShop.makeSale("vanilla");

      expect(saleResult).to.equal(false);
      expect(cupcakeShop.register).to.equal(0);
      expect(cupcakeShop.inventory).to.deep.equal({
        chocolate: {stock: 5, price: 0},
        strawberry: {stock: 3, price: 0}
      })
    });

  });

  describe("cupcakeShop.reconcile", function(){

    it("exists", function(){
      expect(cupcakeShop.reconcile).to.be.a("function");
    });

    it("should deposit the register take in the bank account", function(){
      resetShop();

      cupcakeShop.register = 100;
      cupcakeShop.reconcile()

      expect(cupcakeShop.register).to.equal(0);
      expect(cupcakeShop.bank).to.equal(100);

      cupcakeShop.register = 150;
      cupcakeShop.reconcile()

      expect(cupcakeShop.register).to.equal(0);
      expect(cupcakeShop.bank).to.equal(250);
    });

  });

  describe("cupcakeShop.sellsCookies", function(){

    it("exists", function(){
      expect(cupcakeShop.sellsCookies).to.be.a("function");
    });

    it("returns whether or not the store sells cookies", function(){
      expect(cupcakeShop.sellsCookies()).to.equal(false);
    });

  });

    describe("cupcakeShop.discountSale", function(){

    it("exists", function(){
      expect(cupcakeShop.discountSale).to.be.a("function");
    });


    it("should not sell an out of stock cupcake", function(){
      resetShop();

      cupcakeShop.inventory = {
        chocolate: {stock: 5, price: 0},
        strawberry: {stock: 0, price: 0}
      }

      var saleResult = cupcakeShop.discountSale("strawberry", .4);

      expect(saleResult).to.equal(false);
      expect(cupcakeShop.register).to.equal(0);
      expect(cupcakeShop.inventory).to.deep.equal({
        chocolate: {stock: 5, price: 0},
        strawberry: {stock: 3, price: 0}
      })

    });

    it("should not sell an non-existent flavor", function(){
      resetShop();

      cupcakeShop.inventory = {
        chocolate: {stock: 5, price: 0},
        strawberry: {stock: 3, price: 0}
      }

      var saleResult = cupcakeShop.discountSale("vanilla", .3);

      expect(saleResult).to.equal(false);
      expect(cupcakeShop.register).to.equal(0);
      expect(cupcakeShop.inventory).to.deep.equal({
        chocolate: {stock: 5, price: 0},
        strawberry: {stock: 3, price: 0}
      })
    });

    it("should sell the cupcake at the discounted price", function(){
      resetShop();

      cupcakeShop.inventory = {
        chocolate: {stock: 5, price: 0},
        strawberry: {stock: 3, price: 0}
      }

      var saleResult = cupcakeShop.discountSale("chocolate", .5);

      expect(saleResult).to.equal(true);
      expect(cupcakeShop.chocolate.price).to.equal(1.5);
      expect(cupcakeShop.register).to.equal(1.5);
      expect(cupcakeShop.inventory).to.deep.equal({
        chocolate: {stock: 4, price: 0},
        strawberry: {stock: 3, price: 0}
      })

  });

  });

describe("cupcakeShop.bulkRestock", function(){

    it("exists", function(){
      expect(cupcakeShop.bulkRestock).to.be.a("function");
    });

    it("adds to stock of existing flavors", function(){
      resetShop();

      cupcakeShop.inventory = {
        chocolate: {stock: 8, price: 0},
        vanilla: {stock: 4, price: 0},
        strawberry: {stock: 0, price: 0}
      }

      cupcakeShop.bulkRestock(10);
      
      expect(cupcakeShop.inventory).to.deep.equal({
        chocolate: {stock: 18, price: 0},
        vanilla: {stock: 14, price: 0},
        strawberry: {stock: 10, price: 0}
      })
    });

  });

describe("cupcakeShop.retireFlavor", function(){

    it("exists", function(){
      expect(cupcakeShop.retireFlavor).to.be.a("function");
    });

    it("removes flavors", function(){
      resetShop();

      cupcakeShop.inventory = {
        chocolate: {stock: 10, price: 0},
        vanilla: {stock: 5, price: 0},
        "red velvet": {stock: 15, price: 0}
      }

      cupcakeShop.retireFlavor("red velvet"); // so gross

      expect(cupcakeShop.inventory).to.have.keys("chocolate", "vanilla");
      expect(cupcakeShop.inventory).to.not.have.keys("red velvet");
      expect(cupcakeShop.retired).to.include("red velvet");

    });

    it("retires the flavor only once", function(){
      resetShop();

      cupcakeShop.inventory = {
        chocolate: {stock: 10, price: 0},
        vanilla: {stock: 5, price: 0},
        "red velvet": {stock: 15, price: 0}
      }

      cupcakeShop.retireFlavor("red velvet"); // so gross

      expect(cupcakeShop.inventory).to.have.keys("chocolate", "vanilla");
      expect(cupcakeShop.inventory).to.not.have.keys("red velvet");
      expect(cupcakeShop.retired).to.include("red velvet");

      expect(cupcakeShop.retireFlavor("red velvet")).to.equal(false);


    });

  });


});