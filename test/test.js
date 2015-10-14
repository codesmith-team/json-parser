describe('JSON Parser', function() {
  it('should work on numbers', function() {
    expect(JSONParser(JSON.stringify(1))).to.eql(1);
  });

  it('should work on strings', function() {
    expect(JSONParser(JSON.stringify('test'))).to.eql('test');
  });

  it('should work on booleans', function() {
    expect(JSONParser(JSON.stringify(true))).to.eql(true);
  });

  it('should work on arrays', function() {
    expect(JSONParser(JSON.stringify([]))).to.eql([]);
    expect(JSONParser(JSON.stringify(['a']))).to.eql(['a']);
    expect(JSONParser(JSON.stringify([1]))).to.eql([1]);
    expect(JSONParser(JSON.stringify([true]))).to.eql([true]);
    expect(JSONParser(JSON.stringify([true,1]))).to.eql([true,1]);
    expect(JSONParser(JSON.stringify([true,1,'test']))).to.eql([true,1,'test']);
  });

  it('should work on objects', function() {
    expect(JSONParser(JSON.stringify({}))).to.eql({});
    expect(JSONParser(JSON.stringify({a:true}))).to.eql({a:true});
    expect(JSONParser(JSON.stringify({b:1}))).to.eql({b:1});
    expect(JSONParser(JSON.stringify({c:'test'}))).to.eql({c:'test'})
    expect(JSONParser(JSON.stringify({a:true,b:1}))).to.eql({a:true,b:1});
    expect(JSONParser(JSON.stringify({a:true,b:1,c:'test'}))).to.eql({a:true,b:1,c:'test'});
  });

  it('should working with nesting in objects', function() {
    expect(JSONParser(JSON.stringify({a:{}}))).to.eql({a:{}});
    expect(JSONParser(JSON.stringify({a:{b:1}}))).to.eql({a:{b:1}});
    expect(JSONParser(JSON.stringify({a:{b:1,c:2}}))).to.eql({a:{b:1,c:2}});
    expect(JSONParser(JSON.stringify({a:{b:1},c:2}))).to.eql({a:{b:1},c:2});
    expect(JSONParser(JSON.stringify({a:{b:{c:2}}}))).to.eql({a:{b:{c:2}}});
  });

  it('should working with nesting in arrays', function() {
    expect(JSONParser(JSON.stringify([{a:1}]))).to.eql([{a:1}]);
    expect(JSONParser(JSON.stringify([{a:1},{b:2}]))).to.eql([{a:1},{b:2}]);
    expect(JSONParser(JSON.stringify([{a:{c:2}},{b:2}]))).to.eql([{a:{c:2}},{b:2}]);
  });

});