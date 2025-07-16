from math import factorial
# factorial(6) = 6! = 720

def P(n, r):
    return factorial(n) // factorial(n - r)



def C(n, r):
    return factorial(n) // (factorial(r) * factorial(n - r))

def main():
    print(f"P({100}, {15}) = {P(100, 15)}")
    print(f"C({100}, {10}) = {C(1000, 100)}")

main()