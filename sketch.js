var sketch=function(p)
{
  p.tx=0;
  p.trans=50;
  p.setup=function()
  {
   
    p.cv=p.createCanvas(400, 100);
     p.background(100,100);
    p.cv.parent('canva2');
     

  }
  p.draw=function()
  {
    p.frameRate(10);
   p.background(10+p.trans);
    p.textSize(30);
    if(p.tx==p.width)
      {
        p.tx=0;
        p.trans=0;
        
      }
  p.textFont('Helvetica');
  p.text('Rat In A Maze..!',p.width/2-300+p.tx, p.height/2);
     p.tx=p.tx+10;
    p.trans=p.trans+5;
  }
}


var sketch1=function(p)
{
  p.tx=0;
  p.c=0;
  p.trans=50;
  p.setup=function()
  {
   
    p.cv=p.createCanvas(400, 300);
     p.background(100,100);
    p.cv.parent('canva3');
     

  }
  p.draw=function()
  {
    p.frameRate(10);
   p.background(10+p.trans);
    p.textSize(15);
    if(p.c==100)
      {
        p.trans=10;
        p.c=0;
      }
  p.textFont('Helvetica');
  p.text('A maze is provided in the form R * C matrix, where R is the total number of rows',10,30);
  p.text('the total number of and C is the total number of columns present in the matrix.',10,70);      p.text('present in the matrix . The cell m[0][0] is the source.From ',10,110);
    p.text('the source, the rat starts its journey. The rat has to reach ',10,150);
    p.text('cell m[R - 1][C - 1],the destination cell.The rat can only',10,190);
    p.text('move in the rightward (→) or in the downward (↓) direction',10,230);
    p.text('from the cell where it is currently present.',10,270);
     //p.tx=p.tx+10;
    p.trans=p.trans+5;
    p.c=p.c+1;
  }
}
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
    fill(140,150);
    rect(x,y,size,size);
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
     var right=grid[index(i+1,j)];
     
     var bottom=grid[index(i,j+1)];
    
     if(right&&!right.visited&&grid2[index(i+1,j)]!=-1)
      neighbors.push(right);
     if(bottom&&!bottom.visited&&grid2[index(i,j+1)]!=-1)
       neighbors.push(bottom);
     if(neighbors.length>0)
       {
            //var r=floor(random(0,2));
          return neighbors[0];
         console.log(neighbors[0].i,neighbors[0]);
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
  cnv=createCanvas(600,600);
  cols=floor(width/size);
  rows=floor(height/size);
  cnv.parent('canva');
  frameRate(4);
  for(var i=0;i<rows;i++)
    {
       for(var j=0;j<cols;j++)
         {
           var c=new cell(i,j);
           grid.push(c);
         }
    }
  for(var i=0;i<cols;i++)
    {
      for(var j=0;j<rows;j++)
            grid2[index(i,j)]=0;
    }
  current=grid[0];

  for(var k=0;k<40;k++)
  {
  a1.push(floor(random(1,rows)));
  a2.push(floor(random(1,cols-1)));
  }
  for(var k=0;k<40;k++)
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
  if(i<0||j<0||i>cols-1||j>rows-1)
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
     for(var k=0;k<40;k++)
    {
      d[k].obstacle();
    }
  current.highlight();
  circle(current.i*size+(size/2),current.j*size+(size/2),5);
}
var myp5=new p5(sketch);
var p55=new p5(sketch1);
