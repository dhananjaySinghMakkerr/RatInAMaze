var grid=[];
var grid2=new Array(401);
var cols;
var rows;
var size=40;
var c;
var a1=[];
var a2=[];
var d=[];
var current;
var stack=[];

function cell(i,j){
  this.i=i;
  this.j=j;
  this.walls=[true,true,true,true];
  this.show=function()
  {
    var x=this.i*size;
    var y=this.j*size;
    stroke(50);
    if(this.walls[0])
      line(x,y,x+size,y);
    if(this.walls[1])
      line(x+size,y,x+size,y+size);
    if(this.walls[2])
      line(x+size,y+size,x,y+size);
    if(this.walls[3])
      line(x,y+size,x,y);
      if(this.visited)
        {
          noStroke();
          fill(255,238,173);
          rect(x,y,size,size);
        }
  }
  this.highlight=function()
  {
    var x=this.i*size;
    var y=this.j*size;
    noStroke();
    fill(0,0,0,100);
    rect(x,y,size,size);
  }
  this.obstacle=function()
  {
    var x=this.i*size;
    var y=this.j*size;

    line(x,y,x+size,y+size);
    line(x+size,y,x,y+size);
   }
   this.checkNeighbors=function(m,n)
   {
     if(this.i==m&&this.j==n)
       {
         return current;
       }
     var neighbors=[];
     var right=grid[index(i,j+1)];
     var bottom=grid[index(i+1,j)];
     if(right&&!right.visited&&grid2[index(i,j+1)]!=-1)
       neighbors.push(right);
     if(bottom&&!bottom.visited&&grid2[index(i+1,j)]!=-1)
       neighbors.push(bottom);
     if(neighbors.length>0)
       {
            //var r=floor(random(0,2));
            return neighbors[0];
       }
     else
       {
        return undefined;
       }
   }
 }
  function removeWalls(a,b)
{
  var x=a.i-b.i;
  if(x==-1)
    {
      a.walls[1]=false;
      b.walls[3]=false;
    }
   if(x==1)
    {
      a.walls[3]=false;
      b.walls[1]=false;
    }
  var y=a.j-b.j;
  if(y==-1)
    {
      a.walls[2]=false;
      b.walls[0]=false;
    }
  if(y==1)
    {
      a.walls[0]=false;
      b.walls[2]=false;
    }
}
function setup() {
  cnv=createCanvas(400,400);
  cols=floor(width/size);
  rows=floor(height/size);
  var p = (windowWidth - width) / 2;
  var q = (windowHeight - height) / 2;
  cnv.position(p, q);
  frameRate(4);
  for(var i=0;i<rows;i++)
    {
       for(var j=0;j<cols;j++)
         {
           var c=new cell(i,j);
           grid.push(c);
         }
    }
  for(var i=0;i<rows;i++)
    {
      for(var j=0;j<cols;j++)
            grid2[index(i,j)]=0;
    }
  current=grid[0];

  for(var k=0;k<15;k++)
  {
  a1.push(floor(random(1,rows-1)));
  a2.push(floor(random(1,cols)));
  }
  for(var k=0;k<15;k++)
    {
      c=grid[index(a1[k],a2[k])];
      grid2[index(a1[k],a2[k])]=-1;
      d.push(c);
    }
  /*for(var t=0;t<3;t++)
    {
      for(var k=0;k<3;k++)
          console.log(grid2[index(t,k)]);

    }*/
current.visited=true;

}
function index(i,j)
{
  if(i<0||j<0||i>rows-1||j>cols-1)
  {
    return -1;
  }
  return j+i*cols;
}
function draw() {
  //background(200);

  for(var i=0;i<grid.length;i++)
    {
      grid[i].show();
    }

    var next=current.checkNeighbors(rows-1,cols-1);
    if(next)
      {
        next.visited=true;
        stack.push(current);
        removeWalls(current,next);
        current=next;
      }
     else if(next==current)
       {

          return;
        }

      else if(stack.length>0)
      {
        current=stack.pop();
      }
     for(var k=0;k<15;k++)
    {
      d[k].obstacle();
    }
  current.highlight();
  circle(current.i*size+(size/2),current.j*size+(size/2),5);
}
