provider "aws" {
  region = "ap-south-1"
}

resource "aws_instance" "ec2_machine" {
  ami           = "ami-0f5ee92e2d63afc18"   # ✅ Mumbai valid AMI
  instance_type = "t2.micro"

  tags = {
    Name = "Terra-EC2"
  }
}

output "instance_id" {
  value = aws_instance.ec2_machine.id
}

output "public_ip" {
  value = aws_instance.ec2_machine.public_ip
}